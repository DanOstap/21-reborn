import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import styles from './index.module.scss'
import { FaBroom, FaCheck } from 'react-icons/fa6'

function Profile () {
  const history = useHistory()
  const [changeName, setChangeName] = useState(true)
  const [username, setUsername] = useState('Username')
  const [number, setNumber] = useState('+38(0XX)-XXX-XXXX')
  function changeInfo () {
    setChangeName(!changeName)
  }
  return (
    <>
      <div className={styles.form}>
        <div className={styles.info}>
          <div className={styles.name}>
            {changeName ? (
              <h2>{username}</h2>
            ) : (
              <input
                value={username}
                onChange={event => {
                  setUsername(event.target.value)
                }}
              ></input>
            )}
            {changeName ? (
              <button>
                <FaBroom onClick={changeInfo} />
              </button>
            ) : (
              <button>
                <FaCheck onClick={changeInfo} />
              </button>
            )}
          </div>
          <input type='date' />
          {changeName ? (
            <h2>{number}</h2>
          ) : (
            <input
              value={number}
              onChange={event => {
                setNumber(event.target.value)
              }}
            ></input>
          )}
        </div>
        <div>
          <img src='../../../public/404.png' alt='profilePhoto' />
        </div>
      </div>
    </>
  )
}

export default Profile
