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
      <h1 className="text-2xl text-gray-700 text-center sm:text-left font-bold tracking-widest py-4 uppercase mx-4 sm:mx-8">
        Trending Products
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-12 mx-4 sm:mx-8">
        {allShopifyProduct.edges.map(({ node }: ProductProperties) => (
          <div className="flex flex-col min-h-full relative " key={node.id}>
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
                  className="transition-all duration-200 ease-out transform hover:scale-105 h-full w-full rounded-lg hover:opacity-75"
                  fluid={node.images[0].localFile.childImageSharp.fluid}
                  alt={node.handle}
                />
              </>
            </Link>
            <h1 className="text-lg text-center sm:text-left font-bold mt-2">
              {node.title}
            </h1>
            <h2 className="text-center sm:text-left text-gray-700">
              {node.variants[0].price}
              <span className="font-bold text-xs"> USD</span>
            </h2>
          </div>
        ))}
      </div>
    </>
  )
}
