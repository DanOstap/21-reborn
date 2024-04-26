import * as yup from 'yup'

export const REG_EXP = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])/,
      'Password must contain at least 1 letter (uppercase or lowercase)'
    )
    .matches(/^(?=.*\d)/, 'Password must contain at least 1 number')
    .matches(
      /^(?=.*[@$!%*?&])/,
      'Password must contain at least 1 special character'
    )
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
})
