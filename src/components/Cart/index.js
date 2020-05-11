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
    <div>
      {line_items}
      <h2 className="text-lg font-bold justify-right">Subtotal</h2>
      <p className="">$ {checkout.subtotalPrice}</p>
      <p className="mb-4">Taxes and shipping calculated at checkout</p>
      <button
        className="bg-purple-300 text-white py-2 px-4 hover:bg-purple-400"
        onClick={handleCheckout}
        disabled={checkout.lineItems.length === 0}
      >
        Check out
      </button>
    </div>
  )
}

export default Cart
