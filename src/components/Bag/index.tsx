import { Link } from "gatsby"
import {
  useCart,
  useCartItems,
  useCheckoutUrl,
} from "gatsby-theme-shopify-manager"
import React from "react"
import LineItem from "./LineItem"

interface LineItemProperties {
  id: string
  title: string
  handle: string
  quantity: string
  variant: {
    title: string
    id: string
    price: string
    image: {
      title: string
      src: string
    }
    product: {
      handle: string
    }
    selectedOptions: [
      {
        name: string
        value: string
      }
    ]
  }
}

const Bag = (): JSX.Element => {
  const lineItems = useCartItems()
  const checkoutUrl = useCheckoutUrl()
  const cart = useCart()

  function getCartTotals() {
    if (cart == null) {
      return { tax: "-", total: "-" }
    }
    const total = cart.totalPriceV2
      ? `$${Number(cart.totalPriceV2.amount).toFixed(2)}`
      : "-"
    return { total }
  }

  const { total } = getCartTotals()

  return (
    <div className="sm:h-screen">
      {lineItems.length >= 1 ? (
        <h1 className="text-gray-800 mb-4 ml-4 sm:ml-8 text-xl sm:text-3xl font-bold">
          Your shopping bag:
        </h1>
      ) : null}
      {lineItems.map((item: LineItemProperties) => (
        <LineItem key={item.id} item={item} />
      ))}
      {lineItems.length < 1 ? (
        <div className="flex justify-center h-32 sm:h-64">
          <div className="grid grid-rows-1 text-center items-center px-4">
            <div>
              <div className="text-xl sm:text-2xl tracking-wide">
                Looks like your bag is empty!
              </div>
              <Link to="/">
                <button
                  type="submit"
                  className="bg-blue-300 text-white rounded-lg py-4 px-16 hover:bg-purple-300 uppercase font-bold tracking-wider mt-4">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end mx-4 sm:mx-8">
          <h2 className="text-lg font-bold">Subtotal</h2>
          <p>{total}</p>
          <p className="mb-4">Taxes and shipping calculated at checkout</p>
          <a
            className="bg-blue-300 text-white rounded-lg py-4 px-16 hover:bg-purple-300 uppercase font-bold tracking-wider"
            target="_blank"
            rel="noopener noreferrer"
            href={checkoutUrl}>
            Check out
          </a>
        </div>
      )}
    </div>
  )
}

export default Bag
