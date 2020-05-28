import React, { useContext } from 'react'
import { graphql, Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import Image from 'gatsby-image'
import SEO from '~/components/seo'

const CollectionPage = ({ data }) => {
  const collection = data.collection
  const collections = data.collections
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'USD',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0))

  return (
    <>
      <SEO title={collection.title} description={collection.description} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mt-8 mx-4 sm:mx-4">
        <div className="hidden lg:block col-span-1 mr-6">
          {collections.edges
            ? collections.edges.map(({ node: { title, handle } }) => (
                <div key={title.toString()} className="mt-2 py-6 border-b">
                  <Link to={`/collection/${handle}`}>
                    <div className="text-gray-700 font-bold uppercase tracking-widest hover:underline hover:text-black">
                      {title}
                    </div>
                  </Link>
                </div>
              ))
            : null}
        </div>
        <div className="col-span-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-8 mx-4 sm:mx-4">
            {collection.products ? (
              collection.products.map(
                ({
                  id,
                  handle,
                  title,
                  images: [firstImage],
                  variants: [firstVariant],
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
    collections: allShopifyCollection(limit: 8) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
`
export default CollectionPage
