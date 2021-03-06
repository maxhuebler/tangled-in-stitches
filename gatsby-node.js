const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      products: allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
      collections: allShopifyCollection {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then((result) => {
    result.data.products.edges.forEach(({ node }) => {
      createPage({
        path: `/product/${node.handle}/`,
        component: path.resolve(`./src/templates/ProductPage.tsx`),
        context: {
          handle: node.handle,
        },
      })
    })
    result.data.collections.edges.forEach(({ node }) => {
      createPage({
        path: `/collection/${node.handle}/`,
        component: path.resolve(`./src/templates/CollectionPage.tsx`),
        context: {
          handle: node.handle,
        },
      })
    })
  })
}
