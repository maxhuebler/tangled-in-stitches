import { graphql, useStaticQuery } from "gatsby"
import React, { ReactNode } from "react"

import Footer from "../components/Footer"
import Navigation from "../components/Navigation"

interface LayoutProperties {
  children: ReactNode
}

const Layout = ({ children }: LayoutProperties): JSX.Element => {
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
