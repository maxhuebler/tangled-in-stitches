import React from 'react'

import SEO from '~/components/SEO'
import Bag from '~/components/Bag'

const BagPage = () => (
  <>
    <SEO title="Bag" keywords={[`bag`, `cart`, `checkout`]} />
    <Bag />
  </>
)

export default BagPage
