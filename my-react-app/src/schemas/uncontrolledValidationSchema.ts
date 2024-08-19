import * as Yup from 'yup';

type PictureValue = {
  size: number;
  type: string;
};

export const uncontrolledValidationSchema = Yup.object().shape({
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
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  picture: Yup.mixed<PictureValue>()
    .required('Picture is required')
    .test('fileSize', 'File is too large', (value) => value && value.size <= 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png'].includes(value.type)),
  country: Yup.string().required('Country is required'),
  terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
});
