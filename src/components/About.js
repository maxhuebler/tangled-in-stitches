import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Hero from '~/components/Hero'

export default function About() {
  const { about } = useStaticQuery(
    graphql`
      query AboutPageQuery {
        about: datoCmsAboutPage {
          title
          paragraph1
          paragraph2
          paragraph3
        }
      }
    `
  )
  return (
    <div className="sm:h-screen">
      <Hero />
      <div className="mt-12 mx-8">
        <h1 className="font-bold text-4xl">{about.title}</h1>
        <p className="text-xl sm:text-justify tracking-wide mt-4">
          {about.paragraph1}
        </p>
        <p className="text-xl sm:text-justify tracking-wide mt-8">
          {about.paragraph2}
        </p>
        <p className="text-xl sm:text-justify tracking-wide mt-8">
          {about.paragraph3}
        </p>
      </div>
    </div>
  )
}
