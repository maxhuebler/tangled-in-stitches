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
        allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
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
      <div className="justify-between flex px-12 mb-16">
        <button className="mt-10 bg-indigo-100 uppercase text-black text-lg font-black py-6 px-16 rounded-lg hover:bg-purple-400 hover:text-white">
          <a href="/">home</a>
        </button>
        <button className="mt-10 bg-indigo-100 uppercase text-black text-lg font-black py-6 px-16 rounded-lg hover:bg-purple-400 hover:text-white">
          <a href="/">new</a>
        </button>
        <button className="mt-10 bg-indigo-100 uppercase text-black text-lg font-black py-6 px-16 rounded-lg hover:bg-purple-400 hover:text-white">
          <a href="/">disney</a>
        </button>
        <button className="mt-10 bg-indigo-100 uppercase text-black text-lg font-black py-6 px-16 rounded-lg hover:bg-purple-400 hover:text-white">
          <a href="/">villians</a>
        </button>
        <button className="mt-10 bg-indigo-100 uppercase text-black text-lg font-black py-6 px-16 rounded-lg hover:bg-purple-400 hover:text-white">
          <a href="/">funny</a>
        </button>
      </div>
      <div className="grid grid-cols-5 gap-6 mt-4 mx-12">
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
                      className="max-w-full mb-6"
                      fluid={firstImage.localFile.childImageSharp.fluid}
                      alt={handle}
                    />
                  )}
                </Link>
                <h2 className="text-center font-bold">
                  {getPrice(firstVariant.price)}
                </h2>
                <h1 className="text-lg text-center">{title}</h1>
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
