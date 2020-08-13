import React from "react"

import About from "../components/About"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const AboutPage = (): JSX.Element => (
  <Layout>
    <SEO title="About" />
    <About />
  </Layout>
)

export default AboutPage
