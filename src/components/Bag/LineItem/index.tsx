import { Link } from "gatsby"
import { useUpdateItemQuantity } from "gatsby-theme-shopify-manager"
import React from "react"
import Image, { FluidObject } from "gatsby-image"

interface ItemProperties {
  item: {
    title: string
    handle: string
    quantity: string
    variant: {
      title: string
      id: string
      price: string
      image: {
        title: string
        id: string
        localFile: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
      product: {
        handle: string
      }
      selectedOptions: [
        {
          name: string
          value: string
        }
      ]
    }
  }
}

const LineItem = ({ item }: ItemProperties): JSX.Element => {
  const updateItemQuantity = useUpdateItemQuantity()

  const variantImage = item.variant.image ? (
    <Image
      className="h-auto w-32 sm:h-48 sm:w-auto hover:opacity-75"
      fluid={item.variant.image.localFile.childImageSharp.fluid}
      alt={`${item.title} product shot`}
    />
  ) : null

  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map((option) => (
        <div key={option.name.toString()} className="grid grid-rows-1 mt-2">
          <h3 className="mt-2">{option.name}</h3>
          <h3 className="font-bold">{option.value}</h3>
        </div>
      ))
    : null

  return (
    <>
      <div className="flex justify-between border-solid border rounded-lg py-4 px-4 sm:px-6 mb-6 mx-4 sm:mx-8">
        <div className="flex items-center leading-none">
          <Link to={`/product/${item.variant.product.handle}/`}>
            {variantImage}
          </Link>
          <div className="sm:text-lg ml-6 sm:px-8">
            <p className="tracking-wide font-bold sm:text-xl">{item.title}</p>
            {selectedOptions}
          </div>
        </div>
        <div className="flex items-center">
          <p className="hidden sm:flex mr-4">${item.variant.price}</p>
          <div className="hidden sm:flex bg-white focus:outline-none focus:shadow-outline border rounded-lg py-2 px-4 mr-2 sm:mr-6">
            {item.quantity}
          </div>
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="24"
            onClick={() => updateItemQuantity(item.variant.id, 0)}>
            <path d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z" />
          </svg>
        </div>
      </div>
    </>
  )
}

export default LineItem
