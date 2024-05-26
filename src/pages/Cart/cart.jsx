import React, { useState, useContext } from 'react'
import { CartContext } from '../../utils/cartcontext'
import styles from './index.module.scss'

const Cart = () => {
  const [addressInput, setAddressInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [surnameInput, setSurnameInput] = useState('')
  const [addressResults, setAddressResults] = useState([])
  const { cart, removeFromCart, clearCart, addToCart } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [amount, setAmount] = useState(1)
  const [itemCounts, setItemCounts] = useState({})
  const handlePhoneChange = e => {
    setPhoneInput(e.target.value)
  }
  const handleNameChange = e => {
    setNameInput(e.target.value)
  }
  const handleSurnameChange = e => {
    setSurnameInput(e.target.value)
  }
  const handleAddressChange = e => {
    setAddressInput(e.target.value)
  }
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (itemCounts[item.id] || 1),
      0
    )
  }

  const addItem = itemId => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 1) + 1
    }))
  }
  const removeItem = itemId => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [itemId]: Math.max((prevCounts[itemId] || 1) - 1, 1)
    }))
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
  const handleAddToCart = product => {
    addToCart(product)
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [product.id]: (prevCounts[product.id] || 1) + 1
    }))
  }
  return (
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
                  src={`../../../public/футболка${item.id}.png`}
                  alt={item.name}
                  className={styles.cartItemImage}
                />
                <div className={styles.cartItemDetails}>
                  <h3 className={styles.cartItemName}>{item.name}</h3>
                  <p className={styles.cartItemPrice}>{item.price}₴</p>
                  <div className={styles.count}>
                    <button
                      className={styles.countChange}
                      onClick={() => removeItem(item.id)}
                    >
                      -
                    </button>
                    <p className={styles.count}>{itemCounts[item.id] || 1}</p>
                    <button
                      className={styles.countChange}
                      onClick={() => addItem(item.id)}
                    >
                      +
                    </button>
                  </div>
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
            <p>Total: {calculateTotal()} ₴</p>
            <button onClick={clearCart} className={styles.clearCartButton}>
              Clear Cart
            </button>
          </div>
        )}
      </div>

      <div className={styles.delivery}>
        <h2 className={styles.cartTitle}>Delivery</h2>
        <form className={styles.form} onSubmit={searchAddress}>
          <div className={styles.inputForm}>
            <label htmlFor='address'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={nameInput}
              onChange={handleNameChange}
              className={styles.search}
            />
            <label htmlFor='address'>Surname:</label>
            <input
              type='text'
              id='surname'
              name='surname'
              value={surnameInput}
              onChange={handleSurnameChange}
              className={styles.search}
            />
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

      {/* </div> */}
    </div>
  )
}

export default Cart
