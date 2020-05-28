import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Hero from '~/components/Hero'

export default function About() {
  const { about } = useStaticQuery(
    graphql`
      query AboutPageQuery {
        about: datoCmsAboutPage {
          title
          subtitle
        }
      }
    `
  )
  return (
    <div className="sm:h-screen">
      <Hero />
      <div className="mt-12 mx-4">
        <h1 className="font-bold text-4xl">{about.title}</h1>
        <p className="text-xl text-justify tracking-wider">{about.subtitle}</p>
      </div>
    </div>
  )
}
