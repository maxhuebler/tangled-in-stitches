import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default function Footer({ siteTitle }) {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query {
        allShopifyCollection(limit: 5, skip: 1) {
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
    <footer>
      <div className="bg-gray-100 sm:rounded-t-xl pt-12 sm:pt-20 pb-8 px-6 sm:px-8 sm:px-32 mt-8">
        <div className="grid grid-flow-row sm:grid-cols-3 gap-8">
          <div className="row-span-1 sm:col-span-1">
            <h1 className="text-xl font-bold">Customer Support</h1>
            <ul className="mt-4 text-gray-600">
              <li className="hover:text-black">Returns & Exchanges</li>
              <li className="hover:text-black">Privacy Policy</li>
              <li className="hover:text-black">Terms of Service</li>
            </ul>
          </div>
          <div className="row-span-1 sm:col-span-1">
            <h1 className="text-xl font-bold">Shop Our Collections</h1>
            <ul className="mt-4 text-gray-600">
              {allShopifyCollection.edges
                ? allShopifyCollection.edges.map(({ node: { title } }) => (
                    <li className="hover:text-black">
                      <a href="/">{title}</a>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <div className="row-span-1 sm:col-span-1">
            <h1 className="text-xl sm:text-2xl font-bold text-left sm:text-right">
              orders@tangledinstitches.com
            </h1>
            <ul className="mt-4 sm:text-right text-gray-600">
              <li className="hover:text-black">
                <a
                  href="https://www.instagram.com/tangledinstitches/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Check out our styles on Instagram
                </a>
              </li>
              {/* <li className="hover:text-black">
                <a href="https://twitter.com/tangledinstitches">Twitter</a>
              </li>
              <li className="hover:text-black">
                <a href="https://facebook.com/tangledinstitches">Facebook</a>
              </li>
              <li className="hover:text-black">
                <a href="https://www.tiktok.com/@tangledinstitches?lang=en">
                  TikTok
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <h2 className="text-center mt-10 text-gray-600 text-sm">
          Copyright © {new Date().getFullYear()} {siteTitle}
        </h2>
      </div>
    </footer>
  )
}
