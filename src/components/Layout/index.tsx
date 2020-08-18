import { graphql, useStaticQuery } from "gatsby"
import React, { ReactNode } from "react"

import Footer from "../Footer"
import Navigation from "../Navigation"

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
    <div className="max-w-7xl mx-auto">
      <Navigation siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <Footer siteTitle={data.site.siteMetadata.title} />
    </div>
  )
}

export default Layout
