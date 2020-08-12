import React, { ReactNode } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navigation siteTitle={data.site.siteMetadata.title} />
        {children}
        <Footer siteTitle={data.site.siteMetadata.title} />
      </div>
    </>
  )
}

export default Layout
