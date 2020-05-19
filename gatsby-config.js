const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Tangled in Stitches`,
    description: `Tangled in Stitches Clothing Company, Disney Insipired Clothing`,
    author: `max@huebler.us`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-52251554-5',
        anonymize: true,
        respectDNT: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: 'graphql',
        accessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
        verbose: true,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': path.join(__dirname, 'src/'),
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Roboto',
              variants: ['400', '700', '500'],
              fontDisplay: 'swap',
            },
          ],
        },
        useMinify: true,
        usePreload: true,
        usePreconnect: true,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require('tailwindcss')],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false,
        develop: true,
        tailwind: true,
        ignore: ['react-image-gallery'],
      },
    },
  ],
}
