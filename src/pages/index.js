import React from 'react'

import SEO from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'
import Hero from '~/components/Hero'

const IndexPage = () => (
  <>
    <SEO
      title="Home"
      keywords={[`tangled in stitches`, `home`, `shop`, `clothing`, `disney`]}
    />
    <Hero />
    <ProductGrid />
  </>
)

export default IndexPage
