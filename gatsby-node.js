const fetch = require('isomorphic-fetch');
const path = require('path');
const Agent = require('https').Agent;

const url = `https://${process.env.GATSBY_MIDTYPE_APP_ID}.midtype.dev/graphql`;

const getQuery = type => `
query { 
  __type(name: "${type}") {
    name
    kind
    fields {
      name
      type {
        name
        ofType {
          name
        }
        fields {
          name
          type {
            name
            fields {
              name
            }
            ofType {
              ofType {
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

const modFetch = (url, query) =>
  fetch(url, {
    agent: new Agent({ rejectUnauthorized: false }),
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ query }),
    method: 'POST'
  }).then(res => res.json());

const fetchType = (url, type) => modFetch(url, getQuery(type));

const genFieldsQuery = fields => {
  return `{\n${fields
    .filter(
      field =>
        !field.type.fields &&
        (!field.type.ofType ||
          field.type.ofType.name.indexOf('Connection') === -1)
    )
    .map(field => field.name)
    .join('\n')}\n}`;
};

const fetchModels = () => {
  return fetchType(url, 'Query').then(res => {
    const models = res.data.__type.fields
      .filter(
        field => field.type.name && field.type.name.indexOf('Connection') > -1
      )
      // Filter out users and age models because we handle them specially.
      .filter(field => field.name !== 'users')
      .map(model => {
        const nodes = model.type.fields.find(field => field.name === 'nodes');
        return {
          queryName: model.name,
          type: nodes ? nodes.type.ofType.ofType.name : null
        };
      });
    const promises = models.map(model =>
      fetchType(url, model.type).then(res => {
        const fields = res.data.__type.fields;
        model.query = `${model.queryName} {\nnodes\n${genFieldsQuery(fields)}}`;
      })
    );
    return Promise.all(promises).then(() => {
      const query = `query {\n${models
        .map(model => model.query)
        .join('\n')}\n}`;
      return modFetch(url, query);
    });
  });
};

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  return new Promise(resolve => {
    fetch(url, {
      agent: new Agent({ rejectUnauthorized: false }),
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: `query { 
            pages {
              nodes {
                id
                title
                slug
                description
                template
              }
            }
            posts {
              nodes {
                id
                title
                slug
                body
                author {
                  name
                }
                section {
                  id
                  title
                }
              }
            }
          }`
      }),
      method: 'POST'
    })
      .then(res => res.json())
      .then(res => {
        res.data.pages.nodes.forEach(node => {
          createPage({
            path: node.slug,
            component: path.resolve(
              `./src/templates/${node.template || 'page'}.tsx`
            ),
            context: {
              ...node
            }
          });
        });
        res.data.posts.nodes.forEach(node => {
          createPage({
            path: `blog/${node.slug}`,
            component: path.resolve(`./src/templates/post.tsx`),
            context: {
              ...node
            }
          });
        });
        resolve();
      });
  });
};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  return new Promise(resolve => {
    fetchModels().then(res => {
      Object.keys(res.data).forEach(key => {
        res.data[key].nodes.forEach(item => {
          const meta = {
            id: item.id,
            parent: null,
            children: [],
            internal: {
              type: key,
              content: JSON.stringify(item),
              contentDigest: createContentDigest(item)
            }
          };
          createNode({ ...item, ...meta });
        });
      });
      resolve();
    });
  });
};

// This is necessary to create client only paths for the pages and blog posts.
exports.onCreatePage = ({ page, actions }) => {
  // Redirect all subroutes under the admin pages and posts sections to the same parent pages.
  const { createPage } = actions;
  if (page.path === `/admin/pages/`) {
    page.matchPath = `/admin/pages/*`;
    createPage(page);
  }
  if (page.path === `/admin/posts/`) {
    page.matchPath = `/admin/posts/*`;
    createPage(page);
  }
};
