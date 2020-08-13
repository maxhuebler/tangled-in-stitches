import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const NotFoundPage = (): JSX.Element => (
  <Layout>
    <SEO title="Not found" />
    <h1 className="text-center">This page does not exist.</h1>
  </Layout>
)

export default NotFoundPage
