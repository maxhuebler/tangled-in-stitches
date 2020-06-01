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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:mx-8 items-end">
        <div className="hidden sm:flex px-0 md:px-0">
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
          />
        </div>
        <div className="visibile sm:hidden">
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
          />
        </div>
        <div className="mx-8 sm:mx-0">
          <h1 className="text-4xl font-bold leading-none">{product.title}</h1>
          <ProductForm product={product} />
          <div className="sm:px-8 sm:py-6 mt-12 sm:border rounded-lg">
            <h2 className="font-bold tracking-wider font-grey-800 uppercase">
              Product information
            </h2>
            <p
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            ></p>
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-32">
        <Trending message={`You May Also Like`} />
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
