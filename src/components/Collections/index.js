import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default function Collections() {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query {
        allShopifyCollection(limit: 6, skip: 1) {
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-5 mt-0 sm:mt-12 sm:mx-4">
        <div className="hidden lg:block col-span-1 mr-6">
          {allShopifyCollection.edges
            ? allShopifyCollection.edges.map(({ node: { title } }) => (
                <div key={title.toString()} className="mt-2 py-6 border-b">
                  <a
                    className="text-gray-700 font-bold uppercase tracking-widest hover:underline hover:text-black"
                    href="/"
                  >
                    {title}
                  </a>
                </div>
              ))
            : null}
        </div>
        <div className="col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4 sm:gap-6 items-center">
            {allShopifyCollection.edges
              ? allShopifyCollection.edges.map(({ node: { title } }) => (
                  <div
                    key={title.toString()}
                    className="bg-purple-200 mx-4 sm:mx-0 py-32 px-8 sm:py-56 sm:px-20 text-center rounded-lg font-bold text-3xl uppercase text-white tracking-widest hover:opacity-75 cursor-pointer"
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
      </div>
    </>
  )
}
