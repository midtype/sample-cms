require('dotenv').config({
  path: `.env`
});

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
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'Photo',
        imagePath: 'image.location'
      }
    }
  ]
};
