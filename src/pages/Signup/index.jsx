import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { REG_EXP } from '../../utils/validscheme'
import { useHistory, NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import style from './index.module.scss'

function SignUp ({ setIsLogin }) {
  const initialValues = { mail: '', password: '', confPassword: '' }
  const history = useHistory()

  const handleSubmit = () => {
    history.push('/')
    setIsLogin(true)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={REG_EXP}
    >
      {({ isSubmitting }) => (
        <Form className={style.form}>
          <Field
            type='text'
            name='mail'
            placeholder='example@mail.com'
            className={style.input}
          />
          <ErrorMessage
            name='mail'
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

          <Field
            type='password'
            name='confPassword'
            placeholder='confirmed password'
            className={style.input}
          />
          <ErrorMessage
            name='confPassword'
            component='span'
            className={style.errorMsg}
          />

          <button
            type='submit'
            className={style.submitBtn}
            disabled={isSubmitting}
          >
            Submit
          </button>

          <div className={style.msgAccount}>
            Already have an account?{' '}
            <NavLink to='/login' className={style.link}>
              Login
            </NavLink>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignUp
