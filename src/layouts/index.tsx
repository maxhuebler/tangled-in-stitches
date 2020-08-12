import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Navigation from '~/components/Navigation'
import Footer from '~/components/Footer'

interface Props {
  children: Node
}

const Layout = ({ children }: Props) => {
  return (
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
        // <div className="flex justify-center h-screen bg-purple-200">
        //   <div className="flex items-center text-center">
        //     <div className="items-center">
        //       <h1 className="font-display text-5xl sm:text-7xl leading-none">
        //         Tangled in Stitches
        //       </h1>
        //       <h2 className="text-xl sm:text-3xl text-white uppercase tracking-widest">
        //         Opening Summer 2020
        //       </h2>
        //     </div>
        //   </div>
        // </div>
      )}
    />
  )
}

export default Layout
