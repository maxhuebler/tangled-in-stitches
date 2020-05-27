import React from 'react'

export default function Hero() {
  return (
    <>
      <div
        className="flex flex-col mx-auto py-24 sm:py-32 xl:rounded-xl max-w-7xl"
        style={{
          backgroundImage:
            'linear-gradient(40deg, rgba(222,188,255,1) 0%, rgba(169,211,255,1) 100%)',
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-3xl sm:text-5xl uppercase font-bold leading-tight">
            $20 off $100 plus
          </h1>
          <h1 className="text-xl md:text-3xl uppercase tracking-widest">
            get free next-day delivery
          </h1>
        </div>
      </div>
    </>
  )
}
