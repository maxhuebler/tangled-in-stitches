import React, { useContext } from 'react'
import { Link } from 'gatsby'

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
      {checkout.lineItems.length < 1 ? (
        <div className="flex justify-center h-32 sm:h-64">
          <div className="grid grid-rows-1 text-center items-center px-4">
            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-wide">
                Looks like your bag is empty!
              </div>
              <Link to="/">
                <button className="font-sans font-bold bg-blue-700 px-6 py-4 mt-2 rounded-lg uppercase text-white hover:bg-blue-700 tracking-wider">
                  shop what's new
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end pr-10">
          <h2 className="text-lg font-bold">Subtotal</h2>
          <p>$ {checkout.subtotalPrice}</p>
          <p className="mb-4">Taxes and shipping calculated at checkout</p>
          <button
            className="bg-blue-700 rounded-lg text-white py-2 px-4 hover:bg-blue-800"
            onClick={handleCheckout}
            disabled={checkout.lineItems.length === 0}
          >
            Check out
          </button>
        </div>
      )}
    </>
  )
}

export default Cart
