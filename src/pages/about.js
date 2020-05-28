import React from 'react'

import SEO from '~/components/seo'
import About from '~/components/About'

const AboutPage = () => (
  <>
    <SEO
      title="Home"
      keywords={[`tangled in stitches`, `home`, `shop`, `clothing`, `disney`]}
    />
    <About />
  </>
)

export default AboutPage
