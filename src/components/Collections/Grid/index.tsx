import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"

interface GridProperties {
  node: {
    handle: string
    title: string
    products: string[]
  }
}

export default function Grid(): JSX.Element {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query {
        allShopifyCollection {
          edges {
            node {
              title
              handle
              products {
                title
              }
            }
          }
        }
      }
    `
  )
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-center mt-6 sm:mt-0">
      {allShopifyCollection.edges.map(({ node }: GridProperties) =>
        node.products.length > 0 ? (
          <Link key={node.title.toString()} to={`/collection/${node.handle}`}>
            <div
              className="bg-purple-200 mx-4 sm:mx-0 py-32 sm:py-56 text-center rounded-lg font-bold text-3xl uppercase text-white tracking-widest opacity-75 hover:opacity-50 cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(${
                  Math.random() * 270
                }deg, #13547a 0%, #80d0c7 100%`,
              }}>
              <h1>{node.title}</h1>
            </div>
          </Link>
        ) : null
      )}
    </div>
  )
}
