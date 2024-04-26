import React from 'react'
import styles from './index.module.scss'

function Intro () {
  return (
    <div className={styles.introBlock}>
      <img
        src='../../../public/Picture.png'
        alt='logo-pink'
        className={styles.logoPink}
        draggable={false}
      />
    </div>
  )
}

export default Intro
