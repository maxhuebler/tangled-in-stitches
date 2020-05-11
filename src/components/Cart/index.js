import React, { useContext } from 'react'

import StoreContext from '~/context/StoreContext'
import LineItem from './LineItem'

const Cart = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const line_items = checkout.lineItems.map(line_item => {
    return <LineItem key={line_item.id.toString()} line_item={line_item} />
  })

  return (
    <>
      {line_items}
      <div className="flex flex-col items-end pr-10">
        <h2 className="text-lg font-bold">Subtotal</h2>
        <p>$ {checkout.subtotalPrice}</p>
        <p className="mb-4">Taxes and shipping calculated at checkout</p>
        <button
          className="bg-purple-500 text-white py-2 px-4 hover:bg-purple-600"
          onClick={handleCheckout}
          disabled={checkout.lineItems.length === 0}
        >
          Check out
        </button>
      </div>
    </>
  )
}

export default Cart
