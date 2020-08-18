import { graphql, Link } from "gatsby"
import Image, { FluidObject } from "gatsby-image"
import { useAddItemToCart } from "gatsby-theme-shopify-manager"
import { useKeenSlider } from "keen-slider/react"
import React, { useEffect, useMemo, useState } from "react"

import Layout from "../components/Layout"
import OptionPicker from "../components/OptionPicker"
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
          compareAtPrice?: string
        }
      ]
      options: [
        {
          name: string
          values?: string[]
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

  const colors = product?.options?.find(
    (option) => option.name.toLowerCase() === "color"
  )?.values

  const sizes = product?.options?.find(
    (option) => option.name.toLowerCase() === "size"
  )?.values

  function prepareVariantsWithOptions(variants) {
    return variants.map((variant) => {
      // convert the options to a dictionary instead of an array
      const optionsDictionary = variant.selectedOptions.reduce(
        (options, option) => {
          options[`${option.name.toLowerCase()}`] = option.value
          return options
        },
        {}
      )
      // return an object with all of the variant properties + the options at the top level
      return {
        ...optionsDictionary,
        ...variant,
      }
    })
  }

  const variants = useMemo(() => prepareVariantsWithOptions(product.variants), [
    product.variants,
  ])

  const addItemToCart = useAddItemToCart()
  const [variant, setVariant] = useState(variants[0])
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const newVariant = variants.find(
      (variant: { size: string; color: string }) => {
        return variant.size === size && variant.color === color
      }
    )

    if (variant.shopifyId !== newVariant.shopifyId) {
      setVariant(newVariant)
    }
  }, [size, color, variants, variant.shopifyId])

  function handleAddToCart() {
    addItemToCart(variant.shopifyId, 1)
    setAdded(true)
  }

  return (
    <Layout>
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
          {/* TODO: Add sale price comparision */}
          <h3 className="text-xl sm:text-2xl mb-4">${variant.price}</h3>
          <div className="grid grid-flow-row sm:grid-cols-2 gap-3 sm:gap-0 mb-4">
            <OptionPicker
              key="Color"
              name="Color"
              options={colors}
              selected={color}
              onChange={(event) => setColor(event.target.value)}
            />
            <OptionPicker
              key="Size"
              name="Size"
              options={sizes}
              selected={size}
              onChange={(event) => setSize(event.target.value)}
            />
          </div>
          <button
            className="bg-blue-300 w-64 py-4 rounded-lg hover:bg-purple-300 text-white uppercase font-bold tracking-wider"
            type="submit"
            aria-label="add to cart"
            onClick={handleAddToCart}>
            Add to bag
          </button>
          {added ? (
            <div className="mt-4 text-md">
              <h3 className="text-green-500">
                <Link to="/bag">
                  {product.title} added to your{" "}
                  <span className="font-bold underline">bag.</span>
                </Link>
              </h3>
            </div>
          ) : null}
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
    </Layout>
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
