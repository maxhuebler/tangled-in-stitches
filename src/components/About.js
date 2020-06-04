import React from 'react'
import Img from 'gatsby-image'
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
          image {
            fluid(maxWidth: 414) {
              ...GatsbyDatoCmsFluid_tracedSVG
            }
          }
        }
      }
    `
  )
  return (
    <div className="sm:h-screen">
      <Hero />
      <div className="mt-8 sm:mt-12 mx-8">
        <div className="grid grid-flow-row sm:grid-cols-3">
          <div className="sm:col-span-1 sm:mr-8">
            <h1 className="sm:hidden font-bold text-4xl mb-4">{about.title}</h1>
            <Img className="rounded-lg" fluid={about.image.fluid} />
          </div>
          <div className="sm:mt-0 sm:col-span-2">
            <h1 className="hidden sm:flex font-bold text-4xl">{about.title}</h1>
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
      </div>
    </div>
  )
}
