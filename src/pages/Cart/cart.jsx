import React, { useState, useContext } from 'react'
import { CartContext } from '../../utils/cartcontext'
import styles from './index.module.scss'

const Cart = () => {
  const [addressInput, setAddressInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [addressResults, setAddressResults] = useState([])
  const { cart, removeFromCart, clearCart } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePhoneChange = e => {
    setPhoneInput(e.target.value)
  }

  const handleAddressChange = e => {
    setAddressInput(e.target.value)
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const searchAddress = e => {
    e.preventDefault()

    if (!addressInput) return

    const apiKey = 'd42fd9c4697f1c1a085290c759dcd0df'
    const apiUrl = `https://api.novaposhta.ua/v2.0/json/Address/search`

    const requestData = {
      apiKey: apiKey,
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityName: addressInput,
        Page: '1'
      }
    }

    setLoading(true)

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        setAddressResults(data.data)
      })
      .catch(error => {
        setError('Error fetching address. Please try again.')
        console.error('Error fetching address:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className={styles.cartMenu}>
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty.</p>
          ) : (
            <ul className={styles.cartList}>
              {cart.map(item => (
                <li key={item.id} className={styles.cartItem}>
                  <img
                    src={`../../../public/2daacfe012733764748706b7fc7517fd.jpg`}
                    alt={item.name}
                    className={styles.cartItemImage}
                  />
                  <div className={styles.cartItemDetails}>
                    <h3 className={styles.cartItemName}>{item.name}</h3>
                    <p className={styles.cartItemPrice}>{item.price} uah</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={styles.removeButton}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <div className={styles.cartTotal}>
              <p>Total: {calculateTotal()} uah</p>
              <button onClick={clearCart} className={styles.clearCartButton}>
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.delivery}>
        <h2 className={styles.cartTitle}>Delivery</h2>

        <form className={styles.form} onSubmit={searchAddress}>
          <div className={styles.inputForm}>
            <label htmlFor='address'>Phone number:</label>
            <input
              type='text'
              id='phone'
              name='phone'
              placeholder='+380-(00)-000-00-00'
              value={phoneInput}
              onChange={handlePhoneChange}
              className={styles.search}
            />

            <label htmlFor='address'>Delivery Address:</label>
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Enter your address'
              value={addressInput}
              onChange={handleAddressChange}
              className={styles.search}
            />
            {error && <p className={styles.error}>{error}</p>}
            {addressResults.length > 0 && addressInput ? (
              <select className={styles.search} size='1'>
                {addressResults.map(result => (
                  <option className={styles.searchOption} key={result.Ref}>
                    {result.Description}
                  </option>
                ))}
              </select>
            ) : (
              <p>No results found</p>
            )}
            <button type='submit' className={styles.btnSearch}>
              {loading ? 'Searching...' : 'Search Address'}
            </button>
            <button className={styles.btnOrder} type='submit'>
              Place Order
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cart
