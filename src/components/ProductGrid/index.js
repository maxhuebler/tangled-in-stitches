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
    <div>
      <div className="hidden md:flex justify-between px-12 mb-16">
        <button className="mt-10 bg-purple-300 uppercase text-black text-lg font-black py-6 px-16 rounded-lg hover:bg-purple-400 hover:text-white">
          <a href="/">home</a>
        </button>
        <button className="mt-10 bg-purple-300 uppercase text-black text-lg font-black py-6 px-16 rounded-lg hover:bg-purple-400 hover:text-white">
          <a href="/">new</a>
        </button>
        <button className="mt-10 bg-purple-300 uppercase text-black text-lg font-black py-6 px-16 rounded-lg hover:bg-purple-400 hover:text-white">
          <a href="/">disney</a>
        </button>
        <button className="mt-10 bg-purple-300 uppercase text-black text-lg font-black py-6 px-16 rounded-lg hover:bg-purple-400 hover:text-white">
          <a href="/">villians</a>
        </button>
        <button className="mt-10 bg-purple-300 uppercase text-black text-lg font-black py-6 px-16 rounded-lg hover:bg-purple-400 hover:text-white">
          <a href="/">funny</a>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6 mx-6 sm:mx-12">
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
                <h1 className="text-lg text-left font-bold">{title}</h1>
                <h2 className="text-left">{getPrice(firstVariant.price)}</h2>
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
