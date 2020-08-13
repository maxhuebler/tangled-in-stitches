import React from "react"

import Bag from "../components/Bag"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const BagPage = (): JSX.Element => (
  <Layout>
    <SEO title="Bag" />
    <Bag />
  </Layout>
)

export default BagPage
