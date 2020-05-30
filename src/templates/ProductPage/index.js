import React from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import Trending from '~/components/Trending'
import ImageGallery from 'react-image-gallery'

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <>
      <SEO title={product.title} description={product.description} />
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
          <div className="hidden sm:flex px-0 sm:px-8 md:px-0 mr-4">
            <ImageGallery
              items={product.images.map((image) => ({
                original: `https://tangled-in-stitches-git-develop.maxhuebler.now.sh${image.localFile.childImageSharp.fluid.src}`,
                originalTitle: product.title,
                originalAlt: image.id,
                thumbnail: `https://tangled-in-stitches-git-develop.maxhuebler.now.sh${image.localFile.childImageSharp.fluid.src}`,
                thumbnailAlt: image.id,
              }))}
              showBullets={true}
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={false}
              showThumbnails={true}
              slideDuration={350}
              thumbnailPosition={'left'}
              lazyLoad={true}
            />
          </div>
          <div className="visibile sm:hidden px-0 sm:px-8">
            <ImageGallery
              items={product.images.map((image) => ({
                original: `https://tangled-in-stitches-git-develop.maxhuebler.now.sh${image.localFile.childImageSharp.fluid.src}`,
                originalTitle: product.title,
                originalAlt: image.id,
                thumbnail: `https://tangled-in-stitches-git-develop.maxhuebler.now.sh${image.localFile.childImageSharp.fluid.src}`,
                thumbnailAlt: image.id,
              }))}
              showBullets={true}
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={false}
              showThumbnails={false}
              slideDuration={350}
              lazyLoad={true}
            />
          </div>
          <div className="px-8 sm:px-2 mt-8 sm:mt-0">
            <h1 className="text-4xl font-bold leading-none">{product.title}</h1>
            <ProductForm product={product} />
            <h2 className="font-bold mt-12 tracking-wide font-grey-800 leading-none">
              Product information
            </h2>
            <p
              className="mt-2 text-justify md:max-w-xl"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </div>
        <div className="mt-12 sm:mt-24">
          <Trending message={`You May Also Like`} />
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
        compareAtPrice
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
            fluid(maxWidth: 526) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
export default ProductPage
