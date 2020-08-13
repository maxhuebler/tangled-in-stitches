import { graphql } from "gatsby"
import Image, { FluidObject } from "gatsby-image"
import { useKeenSlider } from "keen-slider/react"
import React, { useState } from "react"

import ProductForm from "../components/ProductForm"
import SEO from "../components/SEO"
import Trending from "../components/Trending"

interface ProductProperties {
  data: {
    product: {
      title: string
      description: string
      images: [
        {
          id: string
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
  }
}

const ProductPage = ({ data }: ProductProperties): JSX.Element => {
  const { product } = data

  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
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
                key={image.id}
                className="keen-slider__slide h-auto sm:rounded-lg">
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
                    aria-label="Next product slide"
                    type="submit"
                    onClick={() => {
                      slider.moveToSlideRelative(idx)
                    }}
                    className={`mt-4 w-3 h-3 mx-2 rounded-full cursor-pointer bg-gray-600 hover:bg-blue-700${
                      currentSlide === idx ? " bg-blue-700" : ""
                    }`}
                  />
                )
              })}
            </div>
          )}
        </div>
        <div className="mx-4 sm:mx-0">
          <h1 className="text-4xl font-bold leading-none">{product.title}</h1>
          <ProductForm product={product} />
          <div className="sm:px-8 sm:py-6 mt-12 sm:border rounded-lg">
            <h2 className="font-bold tracking-wider text-gray-700 uppercase">
              Product information
            </h2>
            <p className="text-justify">{product.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-32">
        <Trending />
      </div>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    product: shopifyProduct(handle: { eq: $handle }) {
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
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      images {
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
