import React from 'react'

import SEO from '~/components/seo'
import Cart from '~/components/Cart'

const CartPage = () => (
  <>
    <SEO title="Cart" keywords={[`cart`, `bag`, `checkout`]} />
    <Cart />
  </>
)

export default CartPage
