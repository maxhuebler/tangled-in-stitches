import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

export default function Footer({ siteTitle }) {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query {
        allShopifyCollection(limit: 5, skip: 5) {
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
    <footer>
      <div className="bg-gray-100 sm:rounded-t-xl pt-12 sm:pt-20 pb-8 px-6 sm:px-8 sm:px-32 mt-12 sm:mx-4">
        <div className="grid grid-flow-row sm:grid-cols-3 gap-8">
          <div className="row-span-1 sm:col-span-1">
            <h1 className="text-xl font-bold">Customer Support</h1>
            <ul className="mt-4 text-gray-600">
              <Link to="/about">
                <li className="hover:text-black">About us</li>
              </Link>
              <li className="hover:text-black">Returns & Exchanges</li>
              <li className="hover:text-black">Privacy Policy</li>
              <li className="hover:text-black">Terms of Service</li>
            </ul>
          </div>
          <div className="row-span-1 sm:col-span-1">
            <h1 className="text-xl font-bold">Shop Our Collections</h1>
            <ul className="mt-4 text-gray-600">
              {allShopifyCollection.edges
                ? allShopifyCollection.edges.map(
                    ({ node: { title, handle } }) => (
                      <Link key={title.toString()} to={`/collection/${handle}`}>
                        <li className="hover:text-black">{title}</li>
                      </Link>
                    )
                  )
                : null}
            </ul>
          </div>
          <div className="row-span-1 sm:col-span-1">
            <a
              className="text-xl font-bold"
              href="mailto:orders@tangledinstitches.com"
            >
              orders@tangledinstitches.com
            </a>
            <ul className="mt-4 text-gray-600">
              <li className="hover:text-black">
                <a
                  href="https://www.instagram.com/tangledinstitches"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Instagram
                </a>
              </li>
              <li className="hover:text-black">
                <a
                  href="https://www.facebook.com/tangledinstitches"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Facebook
                </a>
              </li>
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
