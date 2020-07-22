import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import ContextProvider from '~/context/ContextProvider'
import Navigation from '~/components/Navigation'
import Footer from '~/components/Footer'

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
        render={(data) => (
          // <div className="max-w-7xl mx-auto">
          //   <Navigation siteTitle={data.site.siteMetadata.title} />
          //   {children}
          //   <Footer siteTitle={data.site.siteMetadata.title} />
          // </div>
          <div className="flex justify-center h-screen bg-purple-200">
            <div className="flex items-center text-center">
              <div className="items-center">
                <h1 className="font-display text-5xl sm:text-7xl leading-none">
                  Tangled in Stitches
                </h1>
                <h2 className="text-xl sm:text-3xl text-white uppercase tracking-widest">
                  Opening Summer 2020
                </h2>
              </div>
            </div>
          </div>
        )}
      />
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
