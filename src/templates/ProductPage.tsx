import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import { useKeenSlider } from 'keen-slider/react'
import React from 'react'

import ProductForm from '../components/ProductForm'
import SEO from '../components/SEO'
import Trending from '../components/Trending'

const ProductPage = ({ data }): JSX.Element => {
  const product = data.shopifyProduct
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  return (
    <>
      <SEO title={product.title} description={product.description} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:mx-8 items-center">
        <div>
          <div ref={sliderRef} className="keen-slider">
            {product.images.map((image) => (
              <div
                key={image}
                className="keen-slider__slide h-auto sm:rounded-lg"
              >
                <Image fluid={image.localFile.childImageSharp.fluid} />
              </div>
            ))}
          </div>
          {slider && (
            <div className="flex justify-center">
              {[...Array(slider.details().size).keys()].map((idx) => {
                return (
                  <button
                    key={idx}
                    type="submit"
                    onClick={() => {
                      slider.moveToSlideRelative(idx)
                    }}
                    className={`mt-4 w-3 h-3 mx-2 rounded-full cursor-pointer bg-gray-600${
                      currentSlide === idx ? ' bg-blue-700' : ''
                    }`}
                  />
                )
              })}
            </div>
          )}
        </div>
        <div className="mx-8 sm:mx-0">
          <h1 className="text-4xl font-bold leading-none">{product.title}</h1>
          <ProductForm product={product} />
          <div className="sm:px-8 sm:py-6 mt-12 sm:border rounded-lg">
            <h2 className="font-bold tracking-wider text-gray-700 uppercase">
              Product information
            </h2>
            <p
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-32">
        <Trending message="You May Also Like" />
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
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
export default ProductPage
