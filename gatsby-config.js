require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Tangled in Stitches`,
    siteUrl: `https://tangledinstitches.com`,
    description: `Tangled in Stitches Clothing Company`,
    author: `max@huebler.us`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Norican",
              variants: ["400"],
              text: "Tangled in Stitches",
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
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    `gatsby-plugin-simple-analytics`,
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-robots-txt`,
  ],
}
