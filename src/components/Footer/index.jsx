import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'

function Footer () {
  return (
    <footer>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/info'>Information and delivery</NavLink>
      <NavLink to='/privacy'>Privacy Policy</NavLink>
      <NavLink to='/offer'>Public offer</NavLink>
      <NavLink to='/reviews'>Reviews</NavLink>
    </footer>
  )
}

export default Footer
