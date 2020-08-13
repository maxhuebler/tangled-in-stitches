import { Link, graphql, useStaticQuery } from 'gatsby'
import React from 'react'

interface GridProperties {
  node: {
    handle: string
    title: string
  }
}

export default function Grid(): JSX.Element {
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
    <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4 sm:gap-8 items-center">
      {allShopifyCollection.edges
        ? allShopifyCollection.edges.map(({ node }: GridProperties) => (
            <Link key={node.title.toString()} to={`/collection/${node.handle}`}>
              <div
                className="bg-purple-200 mx-4 sm:mx-0 py-32 sm:py-56 text-center rounded-lg font-bold text-3xl uppercase text-white tracking-widest hover:opacity-75 hover:shadow-lg cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(${
                    Math.random() * 270
                  }deg, rgba(222,188,255,1) 0%, rgba(169,211,255,1) 100%)`,
                }}
              >
                <h1>{node.title}</h1>
              </div>
            </Link>
          ))
        : null}
    </div>
  )
}
