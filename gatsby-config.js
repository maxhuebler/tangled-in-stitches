require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Tangled in Stitches`,
    description: `Tangled in Stitches Clothing Company`,
    author: `max@huebler.us`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-52251554-5",
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
        name: `tangled-in-stitches`,
        short_name: `tangled-in-stitches`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-theme-shopify-manager`,
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.SHOP_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATOCMS_TOKEN,
        preview: false,
        disableLiveReload: false,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Roboto",
              variants: ["400", "700"],
              fontDisplay: "swap",
            },
            {
              family: "Norican",
              variants: ["400"],
              fontDisplay: "swap",
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
        postCssPlugins: [require("tailwindcss")],
      },
    },
  ],
}
