import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Link } from 'gatsby'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'

import StoreContext from '~/context/StoreContext'

const ProductForm = ({ product }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product

  const [added, setAdded] = useState(false)
  const [variant, setVariant] = useState({ ...initialVariant })

  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          (variant) => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client.product, productVariant.shopifyId]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  const handleOptionChange = (optionIndex, { target }) => {
    const { value } = target
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, 1)
    setAdded(true)
  }

  /* 
  Using this in conjunction with a select input for variants 
  can cause a bug where the buy button is disabled, this 
  happens when only one variant is available and it's not the
  first one in the dropdown list. I didn't feel like putting 
  in time to fix this since its an edge case and most people
  wouldn't want to use dropdown styled selector anyways - 
  at least if the have a sense for good design lol.
  */
  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value,
        },
      ],
    })
    if (match === undefined) return true
    if (match.availableForSale === true) return false
    return true
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)

  return (
    <>
      {productVariant.compareAtPrice !== null ? (
        <h3 className="text-xl sm:text-2xl mb-4">
          {price}{' '}
          <span className="line-through">${productVariant.compareAtPrice}</span>
        </h3>
      ) : (
        <h3 className="text-xl sm:text-2xl mb-4">{price}</h3>
      )}
      {options.map(({ id, name, values }, index) => (
        <React.Fragment key={id}>
          <label className="font-bold uppercase" htmlFor={name}>
            {name}
          </label>
          <select
            className="flex bg-gray-100 px-6 py-3 rounded-lg border-2 border-blue-300"
            name={name}
            key={id}
            onBlur={(event) => handleOptionChange(index, event)}
          >
            {values.map((value) => (
              <option
                value={value}
                key={`${name}-${value}`}
                disabled={checkDisabled(name, value)}
              >
                {value}
              </option>
            ))}
          </select>
          <br />
        </React.Fragment>
      ))}
      <button
        className="bg-blue-300 disabled text-white rounded-lg py-4 px-16 hover:bg-purple-300 uppercase font-bold tracking-wider transition duration-300 ease-out transform hover:scale-105"
        type="submit"
        disabled={!available || adding}
        onClick={handleAddToCart}
      >
        Add to bag
      </button>
      {added ? (
        <div className="mt-4 text-md">
          <h3 className="text-green-500">
            {product.title} added to your{' '}
            <Link to="/bag">
              <span className="font-bold underline">bag.</span>
            </Link>
          </h3>
        </div>
      ) : null}
      {!available && <p>This Product is out of Stock!</p>}
    </>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm