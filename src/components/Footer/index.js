import React from 'react'

export default function Footer({ siteTitle }) {
  return (
    <footer>
      <div className="bg-gray-100 sm:rounded-t-xl pt-12 sm:pt-20 pb-8 px-6 sm:px-8 sm:px-32 mt-8">
        <div className="grid grid-flow-row sm:grid-cols-3 gap-8">
          <div className="row-span-1 sm:col-span-1">
            <h1 className="text-xl font-bold">Customer Support</h1>
            <ul className="mt-4 text-gray-600">
              <li className="hover:text-black">Returns & Exchanges</li>
              {/* <li className="hover:text-black">FAQs</li> */}
              <li className="hover:text-black">Privacy Policy</li>
              <li className="hover:text-black">Terms of Service</li>
            </ul>
          </div>
          <div className="row-span-1 sm:col-span-1">
            <h1 className="text-xl font-bold">Shop Our Collections</h1>
            <ul className="mt-4 text-gray-600">
              <li className="hover:text-black">T-Shirts</li>
              <li className="hover:text-black">Long Sleeve Shirts</li>
              <li className="hover:text-black">Stickers</li>
              <li className="hover:text-black">Pocket T-Shirts</li>
            </ul>
          </div>
          <div className="row-span-1 sm:col-span-1">
            <h1 className="text-xl sm:text-2xl font-bold text-left sm:text-right">
              orders@tangledinstitches.com
            </h1>
            <ul className="mt-4 sm:text-right text-gray-600">
              <li className="hover:text-black">Instagram</li>
              <li className="hover:text-black">Twitter</li>
              <li className="hover:text-black">Facebook</li>
              <li className="hover:text-black">TikTok</li>
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
