import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default function CollectionsList() {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query {
        allShopifyCollection(limit: 10) {
          edges {
            node {
              title
            }
          }
        }
      }
    `
  )
  return (
    <div>
      <div className="grid grid-rows mt-8 gap-2">
        {allShopifyCollection.edges
          ? allShopifyCollection.edges.map(({ node: { title } }) => (
              <div
                className="bg-purple-200 py-4 text-center font-bold text-3xl uppercase text-white tracking-widest hover:opacity-75 cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(${Math.random() *
                    270}deg, rgba(222,188,255,1) 0%, rgba(169,211,255,1) 100%)`,
                }}
              >
                <a href="/">{title}</a>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
