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
      className="h-32"
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
    />
  ) : null

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, line_item.id)
  }

  return (
    <div className="flex justify-between items-center border-solid border-2 py-4 px-6 mb-4">
      {variantImage}
      <p className="text-lg font-bold">
        {line_item.title}
        {line_item.variant.title === !'Default Title'
          ? line_item.variant.title
          : ''}
      </p>
      <p className="font-bold">{selectedOptions}</p>
      <p>{line_item.quantity}</p>
      <button
        className="bg-purple-300 text-white py-2 px-4 hover:bg-purple-400"
        onClick={handleRemove}
      >
        Remove
      </button>
    </div>
  )
}

export default LineItem
