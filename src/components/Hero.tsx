import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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
        className="flex flex-col py-24 sm:py-30 xl:rounded-xl xl:mx-8"
        style={{
          backgroundImage:
            'linear-gradient(40deg, rgba(222,188,255,1) 0%, rgba(169,211,255,1) 100%)',
        }}
      >
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
