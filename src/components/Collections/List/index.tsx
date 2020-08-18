import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"

interface ListProperties {
  node: {
    handle: string
    title: string
    products: string[]
  }
}

export default function List(): JSX.Element {
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
    <div className="hidden lg:block col-span-1 mr-6">
      <h2 className="text-xl uppercase font-bold tracking-widest align-top">
        Our Collections
      </h2>
      <div className="mt-10 space-y-12">
        {allShopifyCollection.edges.map(({ node }: ListProperties) =>
          node.products.length > 0 ? (
            <div key={node.title.toString()} className="py-2 border-b">
              <Link to={`/collection/${node.handle}`}>
                <div className="text-gray-700 font-bold uppercase tracking-widest hover:underline hover:text-black">
                  {node.title}
                </div>
              </Link>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
