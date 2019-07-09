const fetch = require('isomorphic-fetch');
const path = require('path');
const Agent = require('https').Agent;

const url = `https://${process.env.GATSBY_MIDTYPE_APP_ID}.midtype.dev/graphql`;

const query = `
query { 
  pages {
    nodes {
      id
      title
      slug
      description
      template
      createdAt
      updatedAt
      __typename
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
      createdAt
      updatedAt
      __typename
    }
  }
  photos {
    nodes {
      id
      image {
        id
        location
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
}
`;

const typeDefs = `
type Page implements Node {
  id: ID!
  title: String!
  slug: String!
  description: String!
  template: String!
  updatedAt: Date! @dateformat
  createdAt: Date! @dateformat
  
}
type User implements Node {
  id: ID!
  name: String!
  email: String!
}
type Section implements Node {
  id: ID!
  title: String!
}
type Post implements Node {
  id: ID!
  title: String!
  slug: String!
  body: String!
  author: User!
  section: Section!
  updatedAt: Date! @dateformat
  createdAt: Date! @dateformat
}
type Asset implements Node {
  id: ID!
  location: String!
  updatedAt: Date! @dateformat
  createdAt: Date! @dateformat
}
type Photo implements Node {
  id: ID!
  image: Asset!
  updatedAt: Date! @dateformat
  createdAt: Date! @dateformat
}
`;

const midtypeFetch = () =>
  fetch(url, {
    agent: new Agent({ rejectUnauthorized: false }),
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ query }),
    method: 'POST'
  }).then(res => res.json());

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  return new Promise(resolve => {
    midtypeFetch().then(res => {
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

exports.sourceNodes = ({ actions, createContentDigest }) => {
  const { createNode, createTypes } = actions;
  createTypes(typeDefs);
  return new Promise(resolve => {
    midtypeFetch().then(res => {
      const { pages, posts, photos } = res.data;
      [...pages.nodes, ...posts.nodes, ...photos.nodes].forEach(node => {
        const meta = {
          id: node.id,
          internal: {
            type: node.__typename,
            content: JSON.stringify(node),
            contentDigest: createContentDigest(node)
          }
        };
        createNode({ ...node, ...meta });
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
