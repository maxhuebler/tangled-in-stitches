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
        allShopifyProduct(sort: { fields: [createdAt], order: ASC }) {
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
                    fluid(maxWidth: 302) {
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
    <div>
      <div className="h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8 mx-4 sm:mx-12">
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
                      className="max-w-full mb-6 rounded-lg"
                      fluid={firstImage.localFile.childImageSharp.fluid}
                      alt={handle}
                    />
                  )}
                </Link>
                <h1 className="text-lg text-center sm:text-left font-bold">
                  {title}
                </h1>
                <h2 className="text-center sm:text-left text-gray-700">
                  {getPrice(firstVariant.price)}{' '}
                  <span className="font-bold text-xs">USD</span>
                </h2>
              </div>
            )
          )
        ) : (
          <p>No Products found!</p>
        )}
      </div>
    </div>
  )
}

export default ProductGrid
