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
    <div className="flex justify-between border-solid border rounded-lg py-4 px-6 mb-6">
      <div className="flex items-center leading-none">
        {variantImage}
        <div className="text-lg px-8">
          <p className="">{line_item.title}</p>
          {line_item.variant.title === !'Default Title'
            ? line_item.variant.title
            : ''}
          <br></br>
          <p className="font-bold">{selectedOptions}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button className="bg-purple-200 px-4 py-2 rounded-lg mr-8">
          {line_item.quantity}
        </button>
        <button
          className="bg-purple-500 text-white py-2 px-4 hover:bg-purple-600"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default LineItem
