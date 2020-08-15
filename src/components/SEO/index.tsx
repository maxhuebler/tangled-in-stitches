import { graphql, StaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import favicon from "../../images/favicon.ico"

interface SEOProperties {
  description?: string
  lang?: string
  meta?: HTMLMetaElement[]
  title: string
}

function SEO({ description, meta = [], title }: SEOProperties): JSX.Element {
  return (
    <StaticQuery
      query={graphql`
        query DefaultSEOQuery {
          site {
            siteMetadata {
              title
              description
              author
            }
          }
        }
      `}
      render={(data) => {
        const metaDescription =
          description || data.site.siteMetadata.description
        return (
          <Helmet
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ].concat(meta)}>
            <html lang="en" />
            <link rel="icon" href={favicon} />
          </Helmet>
        )
      }}
    />
  )
}

export default SEO
