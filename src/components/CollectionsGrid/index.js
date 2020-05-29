import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

export default function CollectionsGrid() {
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
            <Link key={title.toString()} to={`/collection/${handle}`}>
              <div
                className="bg-purple-200 mx-4 sm:mx-0 py-32 sm:py-56 text-center rounded-lg font-bold text-3xl uppercase text-white tracking-widest hover:opacity-75 hover:shadow-lg cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(${Math.random() *
                    270}deg, rgba(222,188,255,1) 0%, rgba(169,211,255,1) 100%)`,
                }}
              >
                <h1>{title}</h1>
              </div>
            </Link>
          ))
        : null}
    </>
  )
}
