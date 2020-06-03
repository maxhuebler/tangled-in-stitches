import React from 'react'

import SEO from '~/components/seo'
import Hero from '~/components/Hero'
import Trending from '~/components/Trending'

import CollectionsList from '../components/CollectionsList'
import CollectionsGrid from '../components/CollectionsGrid'

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
      <CollectionsList />
      <div className="col-span-4">
        <CollectionsGrid />
      </div>
    </div>
  </>
)

export default IndexPage
