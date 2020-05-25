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
      className="h-24 sm:h-32"
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
    <div className="flex justify-between border-solid border rounded-lg py-4 px-6 mb-6 mx-4">
      <div className="flex items-center leading-none">
        <Link to={`/product/${item.variant.product.handle}/`}>
          {variantImage}
        </Link>
        <div className="sm:text-lg ml-6 sm:px-8">
          <p>{item.title}</p>
          {item.variant.title === !'Default Title' ? item.variant.title : ''}
          {selectedOptions}
        </div>
      </div>
      <div className="flex items-center">
        <input
          className="bg-white focus:outline-none focus:shadow-outline block border rounded-lg py-2 px-4 w-20 mr-8"
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          onChange={handleQuantityChange}
          value={quantity}
        />
        <button
          className="bg-blue-700 text-white rounded-lg px-3 py-1 sm:px-4 sm:py-2 hover:bg-blue-800"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default LineItem
