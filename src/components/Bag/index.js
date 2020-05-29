import React, { useContext } from 'react'
import { Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import LineItem from './LineItem'

const Bag = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const lineItems = checkout.lineItems.map((item) => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
    <div className="sm:h-screen">
      {checkout.lineItems.length >= 1 ? (
        <h1 className="text-gray-800 mb-4 ml-4 text-xl sm:text-3xl font-bold">
          Your shopping bag:
        </h1>
      ) : null}
      {lineItems}
      {checkout.lineItems.length < 1 ? (
        <div className="flex justify-center h-32 sm:h-64">
          <div className="grid grid-rows-1 text-center items-center px-4">
            <div>
              <div className="text-xl sm:text-2xl tracking-wide">
                Looks like your bag is empty!
              </div>
              <Link to="/">
                <button className="bg-blue-300 text-white rounded-lg py-4 px-16 hover:bg-purple-300 uppercase font-bold tracking-wider mt-4">
                  Continue Shopping
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
            className="bg-blue-300 text-white rounded-lg py-4 px-16 hover:bg-purple-300 uppercase font-bold tracking-wider"
            onClick={handleCheckout}
            disabled={checkout.lineItems.length === 0}
          >
            Check out
          </button>
        </div>
      )}
    </div>
  )
}

export default Bag
