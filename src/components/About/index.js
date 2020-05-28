import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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
    <div className="h-screen">
      <h1 className="text-4xl">{about.title}</h1>
      <p className="text-xl text-justify">{about.subtitle}</p>
    </div>
  )
}
