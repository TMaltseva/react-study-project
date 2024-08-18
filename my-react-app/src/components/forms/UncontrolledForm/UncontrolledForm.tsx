import { FormEvent, createRef, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../../../schemas/validationSchema';
import { Label, Input, Select, Button, Form } from '../../index';
import { LabelName } from '../../../constants/labelName';
import { ValidationError } from 'yup';
import { validCountries } from '../../../data/countries';

export const UncontrolledForm = () => {
  const navigate = useNavigate();
  const [errorMap, setErrorMap] = useState<Record<string, string> | null>(null);

  const formRefs = useRef<{ [key: string]: React.RefObject<HTMLInputElement> }>({
    name: createRef(),
    age: createRef(),
    email: createRef(),
    password: createRef(),
    confirmPassword: createRef(),
    picture: createRef(),
    terms: createRef(),
  });

  const selectRefs = useRef<{ [key: string]: React.RefObject<HTMLSelectElement> }>({
    gender: createRef(),
    country: createRef(),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: formRefs.current.name.current?.value || '',
      age: parseInt(formRefs.current.age.current?.value || '0', 10),
      email: formRefs.current.email.current?.value || '',
      password: formRefs.current.password.current?.value || '',
      confirmPassword: formRefs.current.confirmPassword.current?.value || '',
      gender: selectRefs.current.gender.current?.value || '',
      picture: formRefs.current.picture.current?.files?.[0],
      country: selectRefs.current.country.current?.value || '',
      terms: formRefs.current.terms.current?.checked || false,
    };

    console.log('Form Data:', formData);

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      setErrorMap(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;

        const formDataWithImage = {
          ...formData,
          picture: base64String,
        };

        console.log('Form Data with Image:', formDataWithImage);

        localStorage.setItem('uncontrolledFormData', JSON.stringify(formDataWithImage));
        console.log('Data saved to localStorage');
        navigate('/');
      };

      if (formData.picture) {
        reader.readAsDataURL(formData.picture);
      } else {
        const formDataWithoutImage = { ...formData, picture: '' };
        localStorage.setItem('uncontrolledFormData', JSON.stringify(formDataWithoutImage));
        console.log('Data saved to localStorage without image');
        navigate('/');
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          errors[error.path as string] = error.message;
        });
        setErrorMap(errors);
      }
    }
  };

  const generateInput = (label: string, type: 'file' | 'text' | 'checkbox' = 'text') => {
    return (
      <div key={label} className="wrapper">
        <div className="input_item">
          <Label htmlFor={label}>{label}</Label>
          <Input ref={formRefs.current[label]} name={label} id={label} type={type} />
        </div>
        {errorMap && errorMap[label] && <p className="errors">{errorMap[label]}</p>}
      </div>
    );
  };

  const generateOptions = (label: string) => {
    return (
      <div key={label} className="wrapper">
        <div className="input_item">
          <Label htmlFor={label}>{label}</Label>
          <Select ref={selectRefs.current[label]} name={label} id={label}>
            <option value="">Select a country</option>
            {validCountries.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </div>
        {errorMap && errorMap.country && <p className="errors">{errorMap.country}</p>}
      </div>
    );
  };

  const generateGenderSelect = () => {
    return (
      <div key="gender" className="wrapper">
        <div className="input_item">
          <Label htmlFor="gender">Gender</Label>
          <Select ref={selectRefs.current.gender} name="gender" id="gender">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
        {errorMap && errorMap.gender && <p className="errors">{errorMap.gender}</p>}
      </div>
    );
  };

  return (
    <div className="uncontrolled">
      <Form onSubmit={handleSubmit}>
        {LabelName.map((label) => {
          if (label === 'gender') {
            return generateGenderSelect();
          }

          if (label === 'country') {
            return generateOptions(label);
          }

          if (label === 'picture') {
            return generateInput(label, 'file');
          }

          if (label === 'terms') {
            return generateInput(label, 'checkbox');
          }

          return generateInput(label);
        })}
        <div className="btn_wrapper">
          <Button disabled={false}>Submit</Button>
        </div>
      </Form>
    </div>
  );
};
