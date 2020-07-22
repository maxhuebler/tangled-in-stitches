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
  return [total]
}

const Navigation = ({ siteTitle }) => {
  return (
    <header>
      <nav className="flex text-center items-center justify-between py-8 sm:py-12">
        <div className="hidden lg:flex w-24"></div>
        <div className="ml-6 lg:ml-0">
          <Link to="/">
            <span className="font-display text-4xl sm:text-5xl text-gray-800 leading-none">
              {siteTitle}
            </span>
          </Link>
        </div>
        <div className="flex justify-end">
          <div className="text-md text-black mr-2 sm:mr-8">
            <Link to="/bag">
              <div className="flex justify-center">
                <svg
                  className="fill-current inline-block h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 7V5c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2h4zm8 2H8v10h8V9zm2 0v10h2V9h-2zM6 9H4v10h2V9zm4-2h4V5h-4v2z" />
                </svg>
                <button className="ml-2 mr-2 sm:mr-0 bg-black justify-center h-8 w-8 rounded-full text-white transition duration-200 ease-out transform hover:scale-110">
                  {useQuantity()}
                </button>
              </div>
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
