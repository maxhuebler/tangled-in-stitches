import React from 'react'

import SEO from '~/components/seo'
import Hero from '~/components/Hero'
import Collections from '~/components/Collections'
import New from '~/components/New'

const IndexPage = () => (
  <>
    <SEO
      title="Home"
      keywords={[`tangled in stitches`, `home`, `shop`, `clothing`, `disney`]}
    />
    <Hero />
    <New message={`What's Trending`} />
    <Collections />
  </>
)

export default IndexPage
