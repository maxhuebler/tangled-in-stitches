import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import Image from 'gatsby-image'

export default function New({ message }) {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(limit: 4, sort: { fields: [createdAt], order: ASC }) {
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
    <>
      <h1 className="text-2xl sm:text-4xl font-bold mt-6 mx-3">{message}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-3 mx-3">
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
                      className="max-w-full mb-6 rounded-lg hover:opacity-75"
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
    </>
  )
}
