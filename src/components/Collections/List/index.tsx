import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"

interface ListProperties {
  node: {
    handle: string
    title: string
  }
}

export default function List(): JSX.Element {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query {
        allShopifyCollection(skip: 4) {
          edges {
            node {
              title
              handle
            }
          }
        }
      }
    `
  )
  return (
    <div className="hidden lg:block col-span-1 mr-6">
      {allShopifyCollection.edges
        ? allShopifyCollection.edges.map(({ node }: ListProperties) => (
            <div key={node.title.toString()} className="mt-2 py-6 border-b">
              <Link to={`/collection/${node.handle}`}>
                <div className="text-gray-700 font-bold uppercase tracking-widest hover:underline hover:text-black">
                  {node.title}
                </div>
              </Link>
            </div>
          ))
        : null}
    </div>
  )
}
