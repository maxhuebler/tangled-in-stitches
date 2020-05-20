import React, { useContext } from 'react'
import { Link } from 'gatsby'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

import StoreContext from '~/context/StoreContext'
import LargeLogo from '../../images/logo_375x79.png'
import SmallLogo from '../../images/logo_240x50.png'

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total]
}

const Navigation = ({ data }) => {
  return (
    <header>
      <nav className="flex items-center justify-center py-8 max-w-7xl sm:py-10 sm:mx-auto">
        <div className="text-white">
          <Link to="/">
            <img
              className="hidden sm:flex"
              src={LargeLogo}
              alt="Tangled in Stitches Logo"
            ></img>
            <img
              className="flex sm:hidden"
              src={SmallLogo}
              alt="Tangled in Stitches Logo"
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
