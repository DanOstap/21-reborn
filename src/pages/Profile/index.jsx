import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// import Login from '../Loginup'
import styles from './index.module.scss'

function Profile ({ name }) {
  const history = useHistory()

  return (
    <>
      <div className={styles.form}>
        <div>
          <h2>Name</h2>
          <p>Birthday</p>
          <p>Number</p>
        </div>
        <div>
          <img src='../../../public/404.png' alt='profilePhoto' />
        </div>
      </div>
    </>
  )
}

export default Profile
