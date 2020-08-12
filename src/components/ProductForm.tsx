import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'gatsby'

import { useAddItemToCart } from 'gatsby-theme-shopify-manager'
import OptionPicker from './OptionPicker'
import { prepareVariantsWithOptions } from '../utilities'

const ProductForm = ({ product }): JSX.Element => {
  const colors = product.options.find(
    (option) => option.name.toLowerCase() === 'color'
  ).values

  const sizes = product.options.find(
    (option) => option.name.toLowerCase() === 'size'
  ).values

  const variants = useMemo(() => prepareVariantsWithOptions(product.variants), [
    product.variants,
  ])

  const addItemToCart = useAddItemToCart()
  const [variant, setVariant] = useState(variants[0])
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const newVariant = variants.find((variant) => {
      return variant.size === size && variant.color === color
    })

    if (variant.shopifyId !== newVariant.shopifyId) {
      setVariant(newVariant)
    }
  }, [size, color, variants, variant.shopifyId, variant.color, variant.size])

  async function handleAddToCart() {
    try {
      await addItemToCart(variant.shopifyId, 1)
      setAdded(true)
    } catch (e) {
      setAdded(false)
    }
  }

  return (
    <>
      {/* TODO: Add sale price comparision */}
      <h3 className="text-xl sm:text-2xl mb-4">${variant.price}</h3>
      <div className="grid grid-cols-2 mb-4">
        <OptionPicker
          key="Color"
          name="Color"
          options={colors}
          selected={color}
          onChange={(event) => setColor(event.target.value)}
        />
        <OptionPicker
          key="Size"
          name="Size"
          options={sizes}
          selected={size}
          onChange={(event) => setSize(event.target.value)}
        />
      </div>
      <button
        className="bg-blue-300 disabled text-white rounded-lg py-4 px-16 hover:bg-purple-300 uppercase font-bold tracking-wider"
        type="submit"
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
    </>
  )
}

export default ProductForm
