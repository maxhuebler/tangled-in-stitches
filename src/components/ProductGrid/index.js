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
    <div className="flex justify-between">
      <div>
        <div className="flex justify-start px-32 py-4 bg-purple-100 mb-6 rounded-lg hover:bg-purple-400 hover:text-white cursor-pointer">
          <a className="text-lg font-black uppercase italic">home</a>
        </div>
        <div className="px-32 py-8 bg-purple-100 mb-6 text-lg font-black uppercase italic rounded-lg hover:bg-purple-400 hover:text-white cursor-pointer">
          new
        </div>
        <div className="px-32 py-8 bg-purple-100 mb-6 text-lg font-black uppercase italic rounded-lg hover:bg-purple-400 hover:text-white cursor-pointer">
          disney
        </div>
        <div className="px-32 py-8 bg-purple-100 mb-6 text-lg font-black uppercase italic rounded-lg hover:bg-purple-400 hover:text-white cursor-pointer">
          pocket tees
        </div>
        <div className="px-32 py-8 bg-purple-100 mb-6 text-lg font-black uppercase italic rounded-lg hover:bg-purple-400 hover:text-white cursor-pointer">
          villians
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-4 mx-12">
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
                <h1 className="text-lg text-center">{title}</h1>
                <h2 className="text-center">{getPrice(firstVariant.price)}</h2>
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
