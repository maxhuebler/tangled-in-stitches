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
      <nav className="flex text-center items-center justify-between py-8 max-w-7xl sm:py-12 sm:mx-auto">
        <div className="hidden lg:flex"></div>
        <div className="text-white ml-4 lg:ml-0">
          <Link to="/">
            <img
              className="w-64 sm:w-full sm:flex"
              src={Logo}
              alt={siteTitle}
            ></img>
          </Link>
        </div>
        <div className="flex justify-end">
          <div className="text-md text-black mr-6">
            <Link to="/bag">
              <svg
                className="fill-current inline-block h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M8 7V5c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2h4zm8 2H8v10h8V9zm2 0v10h2V9h-2zM6 9H4v10h2V9zm4-2h4V5h-4v2z" />
              </svg>
              <button className="ml-2 mr-6 sm:mr-0 bg-black justify-center h-8 w-8 rounded-full text-white">
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
