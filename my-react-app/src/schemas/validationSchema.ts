import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, и 1 специальный символ',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  picture: Yup.mixed()
    .test('fileSize', 'File is too large', (value) => {
      if (!value) return false;
      const file = value as FileList;
      return file && file[0].size <= 1024 * 1024;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return false;
      const file = value as FileList;
      return file && ['image/jpeg', 'image/png'].includes(file[0].type);
    })
    .required('Picture is required'),
  country: Yup.string().required('Country is required'),
  terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions').required(),
});
