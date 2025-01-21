import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './index.module.scss'
import { CartContext } from '../../utils/cartcontext'
import ApiUrl from '../../../urls'

const ProductPage = () => {
  const { addToCart: addToCartContext, cart } = useContext(CartContext)
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${ApiUrl}api/products/${id}`
        )
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching product:', error.message)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = productToAdd => {
    const isProductInCart = cart.some(item => item.id === productToAdd.id)

    if (!isProductInCart) {
      addToCartContext(productToAdd)
    } else {
      console.log('This product is already in the cart.')
    }
  }

  if (product) {
    return (
      <div className={styles.productPage}>
        <div>
          <img
            src={`../../../public/футболка${product.id}.png`}
            alt='item'
            className={styles.productImage}
          />
        </div>
        <div className={styles.productDetails}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.details}>{product.description}</p>
          <p className={styles.details}>Color: {product.color}</p>
          <p className={styles.details}>Size: {product.size}</p>
          <p className={styles.details}>Price: {product.price} uah</p>
          <button
            className={styles.addToCartButton}
            onClick={() => handleAddToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default ProductPage
