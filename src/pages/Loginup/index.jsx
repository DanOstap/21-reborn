import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { REG_EXP } from '../../utils/validscheme'
import { useHistory, NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import style from './index.module.scss'

function Login ({ setIsLogin }) {
  const [mail, setName] = useState('')
  const initialValues = { name: '', password: '' }
  const history = useHistory()

  const handleSubmit = () => {
    history.push('/')
    setIsLogin(true)
  }

  const changeName = e => {
    let newName = e.target.value
    setName(newName)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={REG_EXP}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={style.form} onSubmit={handleSubmit}>
          <Field
            type='text'
            name='name' // Update the name attribute to 'name'
            onChange={changeName}
            placeholder='example@mail.com'
            className={style.input}
          />
          <ErrorMessage
            name='name' // Update the name attribute to 'name'
            component='span'
            className={style.errorMsg}
          />

          <Field
            type='password'
            name='password'
            placeholder='password'
            className={style.input}
          />
          <ErrorMessage
            name='password'
            component='span'
            className={style.errorMsg}
          />

          <div className={style.msgAccount}>
            <button type='submit' className={style.submitBtn}>
              Submit
            </button>
            Already have an account?{' '}
            <NavLink to='/signup' className={style.link}>
              SignUp
            </NavLink>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Login
