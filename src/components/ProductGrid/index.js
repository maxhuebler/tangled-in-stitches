import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import Image from 'gatsby-image'

const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              title
              handle
              createdAt
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              variants {
                price
              }
            }
          }
        }
      }
    `
  )

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'USD',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0))

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {allShopifyProduct.edges ? (
        allShopifyProduct.edges.map(
          ({
            node: {
              id,
              handle,
              title,
              images: [firstImage],
              variants: [firstVariant],
            },
          }) => (
            <div className="flex flex-col min-h-full" key={id}>
              <Link to={`/product/${handle}/`}>
                {firstImage && firstImage.localFile && (
                  <Image
                    className="max-w-full mb-6"
                    fluid={firstImage.localFile.childImageSharp.fluid}
                    alt={handle}
                  />
                )}
              </Link>
              <h1 className="text-lg text-center">{title}</h1>
              <h2 className="text-center">{getPrice(firstVariant.price)}</h2>
            </div>
          )
        )
      ) : (
        <p>No Products found!</p>
      )}
    </div>
  )
}

export default ProductGrid
