import React from 'react'
import { Link } from 'gatsby'

export default function Banner() {
  return (
    <Link to="/">
      <div
        className="bg-gray-100 flex flex-col max-w-7xl mx-auto py-20 mt-8 sm:mt-8 sm:rounded-xl"
        style={{
          backgroundImage:
            'linear-gradient(200deg, rgba(174,92,255,1) 0%, rgba(43,108,176,1) 100%)',
        }}
      >
        <div className="text-center items-center sm:text-left sm:ml-16">
          <h1 className="text-4xl text-white font-bold leading-none">
            Check out all our Collections
          </h1>
          <h2 className="text-xl text-white uppercase tracking-widest mt-4 sm:mt-0">
            New styles every week
          </h2>
        </div>
      </div>
    </Link>
  )
}
