import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './index.module.scss'
import { CartContext } from '../../utils/cartcontext'

const ProductPage = () => {
  const { addToCart } = useContext(CartContext)
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/products/${id}`
        )
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching product:', error.message)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <div>Loading product...</div>
  }

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
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductPage
