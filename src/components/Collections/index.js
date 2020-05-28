import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default function Collections() {
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
    <>
      <div className="grid grid-cols-5 mt-8">
        <div className="col-span-1 mr-8 mt-4">
          {allShopifyCollection.edges
            ? allShopifyCollection.edges.map(({ node: { title } }) => (
                <div className="py-6 text-left font-bold uppercase text-black tracking-widest">
                  <a className="hover:underline" href="/">
                    {title}
                  </a>
                </div>
              ))
            : null}
        </div>
        <div className="col-span-4">
          <div className="grid grid-cols-2 mt-8 gap-6">
            {allShopifyCollection.edges
              ? allShopifyCollection.edges.map(({ node: { title } }) => (
                  <div
                    className="bg-purple-200 py-56 px-20 text-center rounded-lg font-bold text-3xl uppercase text-white tracking-widest hover:opacity-75 cursor-pointer"
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
      {/* <div className="grid grid-cols-2 mt-8 gap-10">
        {allShopifyCollection.edges
          ? allShopifyCollection.edges.map(({ node: { title } }) => (
              <div
                className="bg-purple-200 py-64 text-center rounded-lg font-bold text-3xl uppercase text-white tracking-widest hover:opacity-75 cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(${Math.random() *
                    270}deg, rgba(222,188,255,1) 0%, rgba(169,211,255,1) 100%)`,
                }}
              >
                <a href="/">{title}</a>
              </div>
            ))
          : null}
      </div> */}
    </>
  )
}
