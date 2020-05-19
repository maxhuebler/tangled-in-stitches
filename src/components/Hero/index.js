import React from 'react'

export default function Hero() {
  return (
    <>
      <div className="flex flex-col bg-purple-200 mx-auto py-24 sm:py-32 sm:rounded-xl max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl uppercase font-bold leading-tight">
            $20 off $100 plus,
          </h1>
          <h1 className="text-xl md:text-3xl uppercase tracking-widest">
            get free next-day delivery
          </h1>
        </div>
      </div>
    </>
  )
}
