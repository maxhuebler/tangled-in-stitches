import React from 'react'

import SEO from '~/components/seo'
import About from '~/components/About'

const AboutPage = () => (
  <>
    <SEO
      title="About"
      keywords={[`tangled in stitches`, `about`, `about us`]}
    />
    <About />
  </>
)

export default AboutPage
