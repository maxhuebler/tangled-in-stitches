import React from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import ImageGallery from 'react-image-gallery'

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <>
      <SEO title={product.title} description={product.description} />
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="px-0 sm:px-8">
            <ImageGallery
              items={product.images.map(image => ({
                original: `https://tangled-in-stitches-git-develop.maxhuebler.now.sh${image.localFile.childImageSharp.fluid.src}`,
                originalTitle: product.title,
                originalAlt: image.id,
              }))}
              showBullets={true}
              showNav={true}
              showPlayButton={false}
              showFullscreenButton={false}
              showThumbnails={false}
              slideDuration={375}
              lazyLoad={true}
            />
          </div>
          <div className="px-6 mt-8 sm:mt-0">
            <h1 className="text-4xl font-bold leading-none">{product.title}</h1>
            <ProductForm product={product} />
            <h2 className="font-bold mt-6">Product information</h2>
            <h2
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default ProductPage
