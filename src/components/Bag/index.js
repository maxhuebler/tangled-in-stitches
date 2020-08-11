import React from 'react'
import { Link } from 'gatsby'
import LineItem from './LineItem'

import {
  useCartItems,
  useCheckoutUrl,
  useCart,
} from 'gatsby-theme-shopify-manager'

const Bag = () => {
  const cartItems = useCartItems()
  const checkoutUrl = useCheckoutUrl()

  const cart = useCart()
  const { total } = getCartTotals(cart)

  function getCartTotals(cart) {
    if (cart == null) {
      return { tax: '-', total: '-' }
    }
    const total = cart.totalPriceV2
      ? `$${Number(cart.totalPriceV2.amount).toFixed(2)}`
      : '-'
    return { total }
  }

  return (
    <div className="sm:h-screen">
      {cartItems.length >= 1 ? (
        <h1 className="text-gray-800 mb-4 ml-8 text-xl sm:text-3xl font-bold">
          Your shopping bag:
        </h1>
      ) : null}
      {cartItems.map((lineItem) => (
        <LineItem key={lineItem.toString()} item={lineItem} />
      ))}
      {cartItems.length < 1 ? (
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
          <p>{total}</p>
          <p className="mb-4">Taxes and shipping calculated at checkout</p>
          <a
            className="bg-blue-300 text-white rounded-lg py-4 px-16 hover:bg-purple-300 uppercase font-bold tracking-wider transition duration-300 ease-out transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
            href={checkoutUrl}
          >
            Check out
          </a>
        </div>
      )}
    </div>
  )
}

export default Bag
