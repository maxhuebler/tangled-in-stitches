import React from 'react'

import SEO from '~/components/SEO'
import Hero from '~/components/Hero'
import Trending from '~/components/Trending'

import CollectionsList from '../components/Collections/List'
import CollectionsGrid from '../components/Collections/Grid'

const IndexPage = () => (
  <>
    <SEO
      title="Home"
      keywords={[`tangled in stitches`, `home`, `shop`, `clothing`, `disney`]}
    />
    <Hero />
    <div className="mt-1">
      <Trending message={`What's Trending`} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-5 mt-0 sm:mt-12 sm:mx-8">
      <div className="col-span-1">
        <CollectionsList />
      </div>
      <div className="col-span-4">
        <CollectionsGrid />
      </div>
    </div>
  </>
)

export default IndexPage
