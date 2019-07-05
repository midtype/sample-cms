# Midtype Starter

This project is a starter kit for using Midtype with the following libraries:

- **GatsbyJS**, the [open-source front-end framework](https://gatsbyjs.org) for building statically-generated sites.
- **Typescript**, a [typed superset of Javascript](https://github.com/gatsbyjs/gatsby-starter-default).

It was bootstrapped with [the default Gatsby Starter](https://github.com/facebook/create-react-app), and modified to use Typescript and integrate with Midtype.

## Getting Started

1. In [the "Authentication" section of the Midtype UI](https://app.midtype.com/project/auth), add two redirect URLs (note that your production frontend must be hosted on an `https` domain. If you don't know where you'll host your frontend for the moment, add the second redirect URL when you know.):
   - `http://localhost:8000/login`
   - `https://your-production-frontend-domain.com/login`
  
2. Set up your **local** environment variables by creating a file in the root of this project and name it `.env.development`. Add the following contents to this file:
```sh
GATSBY_MIDTYPE_APP_ID=[YOUR MIDTYPE PROJECT ID]
GATSBY_GOOGLE_SIGN_IN=[YOUR `http://localhost:8000/login` GOOGLE SIGN IN LINK]
GATSBY_MIDTYPE_API_URL=https://api.midtype.com
```

3. Run `yarn` locally to install all dependencies. Then run `yarn start` to run a development version of your site locally. Navigate to `http://localhost:8000` to see your site in action.
4. Log into your site as an admin at `/login`. In the admin panel, you can create pages, blog posts, or upload photos. This acts as your custom CMS. Note that for any page, whatever you specify for the `template` field must be a `.tsx` file in `src/templates/`. For example, if you specify the `template` for a given page to be `about-page`, then ensure that you have a template file at `src/templates/about-page.tsx`. [Learn more about Gatsby templates here](https://www.gatsbyjs.org/contributing/docs-templates/).