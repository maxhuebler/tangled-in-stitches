import { Link } from 'gatsby'
import { useAddItemToCart } from 'gatsby-theme-shopify-manager'
import React, { useEffect, useMemo, useState } from 'react'

import prepareVariantsWithOptions from '../utilities'
import OptionPicker from './OptionPicker'

interface ProductProperties {
  product: {
    options: [
      {
        name?: string
        values?: string[]
      }
    ]
    variants: [
      {
        price: string
        compareAtPrice: string | null
      }
    ]
  }
}

const ProductForm = ({ product }: ProductProperties): JSX.Element => {
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
      <div className="grid grid-flow-row sm:grid-cols-2 gap-3 mb-4">
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
        className="bg-blue-300 w-64 py-4 rounded-lg hover:bg-purple-300 text-white uppercase font-bold tracking-wider"
        type="submit"
        aria-label="add to cart"
        onClick={handleAddToCart}
      >
        Add to bag
      </button>
      {added ? (
        <div className="mt-4 text-md">
          <h3 className="text-green-500">
            <Link to="/bag">
              {product.title} added to your{' '}
              <span className="font-bold underline">bag.</span>
            </Link>
          </h3>
        </div>
      ) : null}
    </>
  )
}

export default ProductForm
