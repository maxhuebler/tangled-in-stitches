import React, { useContext } from 'react'
import { graphql, Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import Image from 'gatsby-image'
import SEO from '~/components/seo'
import CollectionsList from '~/components/CollectionsList'
import Hero from '~/components/Hero'

const CollectionPage = ({ data }) => {
  const collection = data.collection
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const getPrice = (price) =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'USD',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0))

  return (
    <>
      <SEO title={collection.title} description={collection.description} />
      <Hero />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mx-4 sm:mx-4 mt-8">
        <div className="hidden lg:block col-span-1 mr-6">
          <CollectionsList />
        </div>
        <div className="col-span-4">
          <h1 className="hidden sm:flex text-2xl font-bold tracking-widest ml-4 mt-3 py-4 uppercase border-b items-center text-center">
            {collection.title} ({collection.products.length} items)
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-8 mx-4 sm:mx-4">
            {collection.products ? (
              collection.products.map(
                ({
                  id,
                  handle,
                  title,
                  images: [firstImage],
                  variants: [firstVariant, secondVariant],
                }) => (
                  <div className="flex flex-col min-h-full" key={id}>
                    <Link to={`/product/${handle}/`}>
                      {firstImage && firstImage.localFile && (
                        <>
                          {secondVariant.compareAtPrice !== null ? (
                            <div className="bg-blue-300 px-6 py-2 ml-4 mt-4 absolute z-50 shadow hover:shadow-lg">
                              <h2 className="text-lg tracking-widest text-white uppercase">
                                sale
                              </h2>
                            </div>
                          ) : null}
                          <Image
                            className="max-w-full mb-6 rounded-lg"
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
                      {getPrice(firstVariant.price)}
                      <span className="font-bold text-xs"> USD</span>{' '}
                      {secondVariant.compareAtPrice !== null ? (
                        <span className="line-through font-bold">
                          {getPrice(secondVariant.compareAtPrice)}
                          <span className="font-bold text-xs">USD</span>
                        </span>
                      ) : null}
                    </h2>
                  </div>
                )
              )
            ) : (
              <p>No Products found!</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    collection: shopifyCollection(handle: { eq: $handle }) {
      id
      handle
      title
      description
      products {
        id
        handle
        title
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
          title
          price
          compareAtPrice
          id
          availableForSale
          shopifyId
          selectedOptions {
            name
            value
          }
        }
        priceRange {
          maxVariantPrice {
            currencyCode
            amount
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        options {
          id
          name
          values
        }
      }
    }
  }
`
export default CollectionPage