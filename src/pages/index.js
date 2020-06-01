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
    <Trending message={`What's Trending`} />
    <div className="grid grid-cols-1 sm:grid-cols-5 mt-0 sm:mt-12 sm:mx-8">
      <div className="hidden lg:block col-span-1 mr-6">
        <CollectionsList />
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4 sm:gap-6 items-center">
          <CollectionsGrid />
        </div>
      </div>
    </div>
  </>
)

export default IndexPage
