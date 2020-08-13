import { graphql, Link } from "gatsby"
import Image, { FluidObject } from "gatsby-image"
import React from "react"

import CollectionsList from "../components/Collections/List"
import Hero from "../components/Hero"
import SEO from "../components/SEO"

interface ProductProperties {
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
      compareAtPrice: string | null
    }
  ]
}

interface CollectionProperties {
  data: {
    collection: {
      title: string
      description: string
      products: [ProductProperties]
    }
  }
}

const CollectionPage = ({ data }: CollectionProperties): JSX.Element => {
  const { collection } = data

  return (
    <>
      <SEO title={collection.title} description={collection.description} />
      <Hero />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mx-8 mt-8">
        <div className="hidden lg:block col-span-1">
          <CollectionsList />
        </div>
        <div className="col-span-4">
          <h1 className="sm:flex text-lg sm:text-2xl font-bold tracking-widest sm:ml-4 sm:mt-3 py-4 uppercase border-b items-center text-center">
            {collection.title} ({collection.products.length} items)
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-8 sm:ml-4">
            {collection.products.map((product: ProductProperties) => (
              <div className="flex flex-col min-h-full" key={product.id}>
                <Link to={`/product/${product.handle}/`}>
                  <>
                    {product.variants[0].compareAtPrice !== null ? (
                      <div className="bg-blue-300 px-3 py-1 sm:px-6 sm:py-2 sm:ml-4 sm:mt-4 absolute z-50 shadow-md hover:bg-purple-300">
                        <h2 className="sm:text-lg tracking-widest text-white uppercase">
                          sale
                        </h2>
                      </div>
                    ) : null}
                    <Image
                      className="transition duration-300 ease-out transform hover:scale-105 max-w-full mb-6 rounded-lg"
                      fluid={product.images[0].localFile.childImageSharp.fluid}
                      alt={product.handle}
                    />
                  </>
                </Link>
                <h1 className="text-lg text-center sm:text-left font-bold">
                  {product.title}
                </h1>
                <h2 className="text-center sm:text-left text-gray-700">
                  {product.variants[0].price}
                  <span className="font-bold text-xs"> USD</span>{" "}
                  {product.variants[0].compareAtPrice !== null ? (
                    <span className="line-through font-bold">
                      {product.variants[0].compareAtPrice}
                      <span className="font-bold text-xs"> USD</span>
                    </span>
                  ) : null}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    collection: shopifyCollection(handle: { eq: $handle }) {
      title
      description
      products {
        id
        handle
        title
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
`
export default CollectionPage
