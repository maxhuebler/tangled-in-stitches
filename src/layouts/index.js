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
          <div className="max-w-7xl mx-auto">
            <Navigation siteTitle={data.site.siteMetadata.title} />
            {children}
            <Footer siteTitle={data.site.siteMetadata.title} />
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
