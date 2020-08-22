import { graphql, useStaticQuery } from "gatsby"
import React from "react"

export default function Hero(): JSX.Element {
  const { hero } = useStaticQuery(
    graphql`
      query HeroQuery {
        hero: datoCmsHero {
          title
          subtitle
        }
      }
    `
  )
  return (
    <>
      <div
        className="flex flex-col py-24 sm:py-32 xl:rounded-lg xl:mx-8 opacity-75"
        style={{
          backgroundImage: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
        }}>
        <div className="text-center text-white">
          <h1 className="text-3xl sm:text-5xl uppercase font-bold leading-tight">
            {hero.title}
          </h1>
          <h1 className="text-xl md:text-3xl uppercase tracking-widest">
            {hero.subtitle}
          </h1>
        </div>
      </div>
    </>
  )
}
