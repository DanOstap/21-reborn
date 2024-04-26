import React, { useContext } from 'react'
import { FaRegUser, FaUserCircle } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../utils/cartcontext'
import styles from './index.module.scss'

function Header ({ isLogin }) {
  const { cart } = useCart()

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapped}>
        <div className={styles.favicon}>
          <NavLink to='/cart' className={styles.icon}>
            <FaCartShopping alt='Cart' />

            {cart.length > 0 && <span>{cart.length}</span>}
          </NavLink>
          <NavLink
            to={isLogin ? '/profile' : '/signup'}
            className={styles.icon}
          >
            {isLogin ? (
              <FaUserCircle alt='User Profile' />
            ) : (
              <FaRegUser alt='User' />
            )}
          </NavLink>
        </div>
        <div>
          <NavLink to='/' className={styles.logoLink}>
            <img
              className={styles.logo}
              src='/21logo.png'
              alt='logo'
              draggable='false'
            />
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header
