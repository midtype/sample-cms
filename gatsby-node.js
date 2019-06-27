const fetch = require('isomorphic-fetch');
const path = require('path');

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const Agent = require('https').Agent;
  return new Promise(resolve => {
    fetch('https://blog-staging.midtype.dev/graphql', {
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
            component: path.resolve(`./src/templates/page.tsx`),
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
    const Agent = require('https').Agent;
    fetch('https://blog-staging.midtype.dev/graphql', {
      agent: new Agent({ rejectUnauthorized: false }),
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: `query { 
            sections {
              nodes {
                id
                title
              }
            }
          }`
      }),
      method: 'POST'
    })
      .then(res => res.json())
      .then(res => {
        const sections = res.data.sections.nodes;
        sections.forEach(section => {
          const nodeContent = JSON.stringify(section);
          const nodeMeta = {
            id: createNodeId(`section-${section.id}`),
            parent: null,
            children: [],
            internal: {
              type: `Section`,
              mediaType: `text/html`,
              content: nodeContent,
              contentDigest: createContentDigest(section)
            }
          };

          const node = Object.assign({}, section, nodeMeta);
          createNode(node);
        });
        resolve();
      });
  });
};
