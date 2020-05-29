import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

export default function CollectionsList() {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query {
        allShopifyCollection(skip: 5) {
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
    <>
      {allShopifyCollection.edges
        ? allShopifyCollection.edges.map(({ node: { title, handle } }) => (
            <div key={title.toString()} className="mt-2 py-6 border-b">
              <Link to={`/collection/${handle}`}>
                <div className="text-gray-800 font-bold uppercase tracking-widest hover:underline hover:text-black">
                  {title}
                </div>
              </Link>
            </div>
          ))
        : null}
    </>
  )
}
