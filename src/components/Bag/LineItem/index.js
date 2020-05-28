import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'

const LineItem = props => {
  const { item } = props
  const [quantity, setQuantity] = useState(item.quantity)
  const {
    removeLineItem,
    updateLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = item.variant.image ? (
    <img
      className="h-32 sm:h-48"
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
    />
  ) : null

  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map(option => (
        <div className="grid grid-rows-1 mt-2">
          <div>
            <h3 className="mt-2">{option.name}</h3>
            <h3 className="font-bold">{option.value}</h3>
          </div>
        </div>
      ))
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
    updateLineItem(client, checkout.id, item.id, target.value)
  }

  return (
    <>
      <div className="flex justify-between border-solid border rounded-lg py-4 px-4 sm:px-6 mb-6 mx-4">
        <div className="flex items-center leading-none">
          <Link to={`/product/${item.variant.product.handle}/`}>
            {variantImage}
          </Link>
          <div className="sm:text-lg ml-6 sm:px-8">
            <p className="tracking-wider">{item.title}</p>
            {item.variant.title === !'Default Title' ? item.variant.title : ''}
            {selectedOptions}
          </div>
        </div>
        <div className="flex items-center">
          <p className="hidden sm:flex mr-4">
            ${item.variant.price * quantity}.00
          </p>
          <input
            className="sm:hidden bg-white focus:outline-none focus:shadow-outline block border rounded-lg py-2 px-4 w-12 mr-2 sm:mr-6"
            type="tel"
            pattern="[0-9]*"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            onChange={handleQuantityChange}
            value={quantity}
            aria-label="input"
          />
          <input
            className="hidden sm:flex bg-white focus:outline-none focus:shadow-outline block border rounded-lg py-2 px-4 w-20 mr-2 sm:mr-6"
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            onChange={handleQuantityChange}
            value={quantity}
            aria-label="input"
          />
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="24"
            onClick={handleRemove}
          >
            <path d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z" />
          </svg>
        </div>
      </div>
    </>
  )
}

export default LineItem
