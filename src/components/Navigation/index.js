import React, { useContext } from 'react'
import { Link } from 'gatsby'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

import StoreContext from '~/context/StoreContext'
import Logo from '~/images/logo.png'

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total]
}

const Navigation = ({ siteTitle }) => {
  return (
    <header>
      <nav className="flex items-center justify-center py-8 max-w-7xl sm:py-12 sm:mx-auto">
        <div className="text-white">
          <Link to="/">
            <img
              className="w-64 sm:w-full sm:flex"
              src={Logo}
              alt={siteTitle}
            ></img>
          </Link>
        </div>
        <div className="flex justify-end items-center text-center">
          <div className="text-md text-white ">
            <Link to="/cart">
              <button className="ml-4 bg-black justify-center h-8 w-8 rounded-full">
                {useQuantity()}
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
