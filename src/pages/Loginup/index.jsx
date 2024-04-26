import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { REG_EXP } from '../../utils/validscheme'
import { useHistory, NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import style from './index.module.scss'

function Login ({ setIsLogin, setLoginName }) {
  const initialValues = { email: '', password: '' }
  const history = useHistory()

  const handleSubmit = (values, formikBag) => {
    try {
      const { email } = values
      setLoginName(email)
      setIsLogin(true)
      history.push('/')
      formikBag.resetForm()
    } catch (error) {
      console.log('error :>> ', error)
    }
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
            type='email'
            name='email'
            placeholder='example@mail.com'
            className={style.input}
          />
          <ErrorMessage
            name='email'
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
            <button
              type='submit'
              className={style.submitBtn}
              disabled={isSubmitting}
            >
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
