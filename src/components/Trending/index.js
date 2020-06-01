import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import Image from 'gatsby-image'

export default function Trending({ message }) {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(limit: 6, sort: { fields: [createdAt], order: ASC }) {
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
                compareAtPrice
              }
            }
          }
        }
      }
    `
  )

  const getPrice = (price) =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'USD',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0))

  return (
    <>
      <h1 className="text-2xl text-gray-800 font-bold tracking-widest py-4 uppercase mx-4 sm:mx-8 mt-1">
        {message}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 mx-4 sm:mx-8">
        {allShopifyProduct.edges ? (
          allShopifyProduct.edges.map(
            ({
              node: {
                id,
                handle,
                title,
                images: [firstImage],
                variants: [price, secondVariant],
              },
            }) => (
              <div className="flex flex-col min-h-full" key={id}>
                <Link to={`/product/${handle}/`}>
                  {firstImage && firstImage.localFile && (
                    <>
                      {secondVariant.compareAtPrice !== null ? (
                        <div className="bg-blue-300 px-3 py-1 sm:px-6 sm:py-2 sm:ml-4 sm:mt-4 absolute z-50 shadow-md hover:bg-purple-300">
                          <h2 className="sm:text-lg tracking-widest text-white uppercase">
                            sale
                          </h2>
                        </div>
                      ) : null}
                      <Image
                        className="transition duration-300 ease-out transform hover:scale-110 relative max-w-full mb-6 rounded-lg hover:opacity-75"
                        fluid={firstImage.localFile.childImageSharp.fluid}
                        alt={handle}
                      />
                    </>
                  )}
                </Link>
                <h1 className="text-lg text-center sm:text-left font-bold">
                  {title}
                </h1>
                <h2 className="text-center sm:text-left text-gray-700">
                  {getPrice(price.price)}{' '}
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
