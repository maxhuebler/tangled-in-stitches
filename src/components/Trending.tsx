import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import Image from 'gatsby-image'

export default function Trending(message: string): JSX.Element {
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
                compareAtPrice
              }
            }
          }
        }
      }
    `
  )

  return (
    <>
      <h1 className="text-2xl text-gray-700 font-bold tracking-widest py-4 uppercase mx-8">
        {/* {message} */}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mx-8">
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
                        className="transition duration-300 ease-out transform hover:scale-105 relative max-w-full mb-6 rounded-lg hover:opacity-50"
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
                  {price.price}
                  <span className="font-bold text-xs"> USD</span>
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
