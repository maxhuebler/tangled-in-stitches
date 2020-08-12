import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

import Hero from './Hero'
import CollectionList from './Collections/List'

export default function About(): JSX.Element {
  const { about } = useStaticQuery(
    graphql`
      query AboutPageQuery {
        about: datoCmsAboutPage {
          title
          paragraph1
          paragraph2
          paragraph3
          image {
            fluid(maxWidth: 900) {
              ...GatsbyDatoCmsFluid_tracedSVG
            }
          }
        }
      }
    `
  )
  return (
    <div className="">
      <Hero />
      <div className="mt-8 sm:mt-12 mx-8">
        <div className="grid grid-flow-row sm:grid-cols-3">
          <div className="sm:col-span-1 sm:mr-12">
            <h1 className="sm:hidden font-bold text-4xl mb-4">{about.title}</h1>
            <CollectionList />
          </div>
          <div className="sm:mt-0 sm:col-span-2 text-justify tracking-wide">
            <h1 className="hidden sm:flex font-bold text-4xl">{about.title}</h1>
            <Img className="rounded-lg sm:mt-4" fluid={about.image.fluid} />
            <div className="text-xl tracking-wide mt-10 text-indent">
              <p className="mt-4">{about.paragraph1}</p>
              <p className="mt-4">{about.paragraph2}</p>
              <p className="mt-4">{about.paragraph3}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
