import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name should start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .positive('Age should be a positive number')
    .integer('Age should be an integer')
    .required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password should contain at least one uppercase letter, one lowercase letter, one number and one special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords should match')
    .required('Confirm password is required'),
  gender: Yup.string().required('Gender is required'),
  picture: Yup.mixed()
    .test('fileSize', 'File is too large', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0) return true;
      return value[0].size <= 1024 * 1024;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0) return true;
      return ['image/jpeg', 'image/png'].includes(value[0].type);
    })
    .required('Picture is required'),
  country: Yup.string().required('Country is required'),
  terms: Yup.bool().oneOf([true], 'You should accept the terms and conditions').required(),
});
