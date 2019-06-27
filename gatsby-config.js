const fetch = require('node-fetch');
const Agent = require('https').Agent;
const apollo = require('apollo-link-http');

module.exports = {
  siteMetadata: {
    title: `My Blog`,
    description: `A blog created using Midtype with GatsbyJS and Typescript.`,
    author: `@midtype`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `midtype-starter-gatsby-typescript`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/midtype-logo.png`
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Midtype',
        fieldName: 'midtype',
        createLink: () => {
          return apollo.createHttpLink({
            uri: 'https://blog-staging.midtype.dev/graphql',
            fetchOptions: {
              agent: new Agent({ rejectUnauthorized: false })
            },
            fetch
          });
        }
      }
    }
  ]
};
