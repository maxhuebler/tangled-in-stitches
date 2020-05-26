import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import ContextProvider from '~/provider/ContextProvider'

import Navigation from '~/components/Navigation'

const Layout = ({ children }) => {
  return (
    <ContextProvider>
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Navigation siteTitle={data.site.siteMetadata.title} />
            <div className="mx-auto max-w-7xl">
              {children}
              <footer>
                <div class="bg-gray-100 sm:rounded-t-xl pt-12 sm:pt-20 pb-8 px-6 sm:px-8 sm:px-32 mt-16">
                  <div className="grid grid-flow-row sm:grid-cols-3 gap-8">
                    <div className="row-span-1 sm:col-span-1">
                      <h1 className="text-xl font-bold">Customer Support</h1>
                      <ul className="mt-4 text-gray-600">
                        <li className="hover:text-black">
                          Returns & Exchanges
                        </li>
                        <li className="hover:text-black">FAQs</li>
                        <li className="hover:text-black">Privacy Policy</li>
                        <li className="hover:text-black">Terms of Service</li>
                      </ul>
                    </div>
                    <div className="row-span-1 sm:col-span-1">
                      <h1 className="text-xl font-bold">
                        Shop our collections
                      </h1>
                      <ul className="mt-4 text-gray-600">
                        <li className="hover:text-black">T-shirts</li>
                        <li className="hover:text-black">Long sleeve</li>
                        <li className="hover:text-black">Sweaters</li>
                        <li className="hover:text-black">Pocket T-shirts</li>
                      </ul>
                    </div>
                    <div className="row-span-1 sm:col-span-1 sm:mr-4">
                      <h1 className="text-xl sm:text-2xl font-bold text-left sm:text-right">
                        orders@tangledinstitches.com
                      </h1>
                      <ul className="mt-4 sm:text-right text-gray-600">
                        <li className="hover:text-black">Instagram</li>
                        <li className="hover:text-black">Twitter</li>
                        <li className="hover:text-black">Facebook</li>
                        <li className="hover:text-black">TikTok</li>
                      </ul>
                    </div>
                  </div>
                  <h2 className="text-center mt-10 text-gray-600 text-sm">
                    Copyright © {new Date().getFullYear()}{' '}
                    {data.site.siteMetadata.title}
                  </h2>
                </div>
              </footer>
            </div>
          </>
        )}
      />
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
