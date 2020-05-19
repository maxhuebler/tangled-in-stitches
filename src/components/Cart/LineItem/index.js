import React, { useContext } from 'react'
import { Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'

const LineItem = props => {
  const { line_item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = line_item.variant.image ? (
    <img
      className="h-20 sm:h-32"
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
    />
  ) : null

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(option => (
        <div className="grid grid-rows-1 mt-2">
          <div>
            <h3 className="mt-2 font-bold">{option.name}</h3>
            <h3>{option.value}</h3>
          </div>
        </div>
      ))
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, line_item.id)
  }

  return (
    <div className="flex justify-between border-solid border rounded-lg py-4 px-6 mb-6 mx-4">
      <div className="flex items-center leading-none">
        <Link to={`/product/${line_item.id}/`}>{variantImage}</Link>
        <div className="sm:text-lg px-8">
          <p className="">{line_item.title}</p>
          {line_item.variant.title === !'Default Title'
            ? line_item.variant.title
            : ''}
          {selectedOptions}
        </div>
      </div>
      <div className="flex items-center">
        <button className="bg-purple-200 px-3 py-1 sm:px-4 sm:py-2 rounded-lg mr-2 sm:mr-8 cursor-default">
          {line_item.quantity}
        </button>
        <button
          className="bg-purple-500 text-white px-3 py-1 sm:px-4 sm:py-2 hover:bg-purple-600"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default LineItem
