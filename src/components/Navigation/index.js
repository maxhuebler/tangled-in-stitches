import React, { useContext } from 'react'
import { Link } from 'gatsby'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

import StoreContext from '~/context/StoreContext'

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()

  return (
    <header>
      <nav className="items-center flex sm:justify-between mx-auto py-16 max-w-7xl">
        <div className="text-white">
          <Link to="/">
            <span className="font-display text-6xl text-black leading-none">
              {siteTitle}
            </span>
          </Link>
        </div>
        <div className="flex justify-end items-center">
          <div className="text-md sm:ml-4 sm:ml-0">
            <a
              href="/"
              className="hidden sm:inline text-md ml-4 hover:underline"
            >
              About us
            </a>
            <a
              href="/"
              className="hidden sm:inline text-md ml-4 hover:underline"
            >
              Contact Us
            </a>
            <Link to="/cart">
              <button className="ml-4 text-center text-white bg-black justify-center h-8 w-8 rounded-full">
                {quantity}
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
