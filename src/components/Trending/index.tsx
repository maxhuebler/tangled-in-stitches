import { graphql, Link, useStaticQuery } from "gatsby"
import Image, { FluidObject } from "gatsby-image"
import React from "react"

interface ProductProperties {
  node: {
    id: string
    title: string
    handle: string
    images: [
      {
        localFile: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
    ]
    variants: [
      {
        price: string
        compareAtPrice?: string
      }
    ]
  }
}

export default function Trending(): JSX.Element {
  const { desktop, mobile } = useStaticQuery(
    graphql`
      query {
        desktop: allShopifyProduct(
          limit: 5
          sort: { fields: [createdAt], order: ASC }
        ) {
          edges {
            node {
              id
              title
              handle
              createdAt
              images {
                localFile {
                  childImageSharp {
                    fluid(quality: 100) {
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
        mobile: allShopifyProduct(
          limit: 4
          sort: { fields: [createdAt], order: ASC }
        ) {
          edges {
            node {
              id
              title
              handle
              createdAt
              images {
                localFile {
                  childImageSharp {
                    fluid(quality: 100) {
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
      <h1 className="text-2xl text-gray-700 text-center sm:text-left font-bold tracking-widest py-4 uppercase mx-4 sm:mx-8">
        Trending Products
      </h1>
      <div className="hidden sm:grid sm:grid-cols-5 sm:gap-12 sm:mx-8">
        {desktop.edges.map(({ node }: ProductProperties) => (
          <div key={node.id}>
            <Link to={`/product/${node.handle}/`}>
              {node.variants[0].compareAtPrice !== null ? (
                <div className="bg-blue-300 px-3 py-1 sm:px-6 sm:py-2 sm:ml-4 sm:mt-4 absolute z-50 shadow-md hover:bg-purple-300">
                  <h2 className="sm:text-lg tracking-widest text-white uppercase">
                    sale
                  </h2>
                </div>
              ) : null}
              <Image
                className="h-64 rounded-lg hover:opacity-75"
                fluid={node.images[0].localFile.childImageSharp.fluid}
                alt={node.handle}
              />
              <h1 className="text-lg text-center sm:text-left font-bold mt-2">
                {node.title}
              </h1>
              <h2 className="text-center sm:text-left text-gray-700">
                {node.variants[0].price}
                <span className="font-bold text-xs"> USD</span>
              </h2>
            </Link>
          </div>
        ))}
      </div>
      <div className="grid sm:hidden grid-cols-2 gap-4 mx-4">
        {mobile.edges.map(({ node }: ProductProperties) => (
          <div key={node.id}>
            <Link to={`/product/${node.handle}/`}>
              <>
                {node.variants[0].compareAtPrice !== null ? (
                  <div className="bg-blue-300 px-3 py-1 sm:px-6 sm:py-2 sm:ml-4 sm:mt-4 absolute z-50 shadow-md hover:bg-purple-300">
                    <h2 className="sm:text-lg tracking-widest text-white uppercase">
                      sale
                    </h2>
                  </div>
                ) : null}
                <Image
                  className="h-64 rounded-lg hover:opacity-75"
                  fluid={node.images[0].localFile.childImageSharp.fluid}
                  alt={node.handle}
                />
              </>
              <h1 className="text-lg text-center sm:text-left font-bold mt-2">
                {node.title}
              </h1>
              <h2 className="text-center sm:text-left text-gray-700">
                {node.variants[0].price}
                <span className="font-bold text-xs"> USD</span>
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
