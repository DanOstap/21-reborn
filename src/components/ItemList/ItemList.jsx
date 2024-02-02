import React, { useState, useContext } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { CartContext } from '../../utils/cartcontext'

const fetchProductsData = async () => {
  try {
    const response = await axios.get('http://localhost:5555/api/products/')
    return response.data
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`)
  }
}

const Item = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useContext(CartContext)

  return (
    <div key={product.id} className={styles.item}>
      <Link to={`/product/${product.id}`}>
        <img
          className={styles.image}
          src={`../../../public/футболка${product.id}.png`}
          alt={`img ${product.id}`}
        />
        <h1 className={styles.name}>{product.name}</h1>
      </Link>
      <button
        className={styles.addToCartButton}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => addToCart(product)}
      >
        <h2 className={styles.price}>
          {isHovered ? 'Add to cart' : `${product.price} uah`}
        </h2>
      </button>
    </div>
  )
}

const ItemList = () => {
  const {
    data: products,
    error,
    isLoading
  } = useQuery('productsData', fetchProductsData)

  if (isLoading)
    return <div className={styles.loading}>Fetching products...</div>
  if (error) return <div className={styles.error}>{error.message}</div>

  return (
    <div className={styles.itemList}>
      {products.map(product => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ItemList
