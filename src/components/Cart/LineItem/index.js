import React, { useContext } from 'react'

import StoreContext from '~/context/StoreContext'

const LineItem = props => {
  const { line_item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = line_item.variant.image ? (
    <img
      className="h-24 sm:h-32"
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
    />
  ) : null

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(option => (
        <div className="grid grid-rows-1 mt-2">
          <div>
            <h3 className="mt-2">{option.name}</h3>
            <h3 className="font-bold">{option.value}</h3>
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
        {variantImage}
        <div className="sm:text-lg ml-6 sm:px-8">
          <p>{line_item.title}</p>
          {line_item.variant.title === !'Default Title'
            ? line_item.variant.title
            : ''}
          {selectedOptions}
        </div>
      </div>
      <div className="flex items-center">
        <button className="bg-blue-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg mr-2 sm:mr-8 cursor-default">
          {line_item.quantity}
        </button>
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
