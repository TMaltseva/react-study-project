import { createRef, FormEvent, RefObject, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Label, Select } from '../../index';
import { uncontrolledValidationSchema } from '../../../schemas/uncontrolledValidationSchema';
import { setUncontrolledData } from '../../../store/formSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { LabelName } from '../../../constants/labelName';

export const UncontrolledForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries);
  const [errorMap, setErrorMap] = useState<Record<string, string> | null>(null);

  const formRefs = useRef<{ [key: string]: RefObject<HTMLInputElement> }>({
    name: createRef(),
    age: createRef(),
    email: createRef(),
    password: createRef(),
    confirmPassword: createRef(),
    picture: createRef(),
    terms: createRef(),
  });

  const selectRefs = useRef<{ [key: string]: RefObject<HTMLSelectElement> }>({
    gender: createRef(),
    country: createRef(),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: formRefs.current.name.current?.value?.trim() || '',
      age: formRefs.current.age.current?.value ? parseInt(formRefs.current.age.current.value, 10) : undefined,
      email: formRefs.current.email.current?.value?.trim() || '',
      password: formRefs.current.password.current?.value?.trim() || '',
      confirmPassword: formRefs.current.confirmPassword.current?.value?.trim() || '',
      gender: selectRefs.current.gender.current?.value || '',
      picture: formRefs.current.picture.current?.files?.[0] || null,
      country: selectRefs.current.country.current?.value || '',
      terms: formRefs.current.terms.current?.checked || false,
    };

    console.log('Form Data:', formData);

    try {
      await uncontrolledValidationSchema.validate(formData, { abortEarly: false });
      setErrorMap(null);

      if (formData.picture) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          dispatch(
            setUncontrolledData({
              ...formData,
              age: formData.age || 0,
              picture: base64String,
            }),
          );
        };
        reader.readAsDataURL(formData.picture);
      } else {
        dispatch(
          setUncontrolledData({
            ...formData,
            age: formData.age || 0,
            picture: '',
          }),
        );
      }

      navigate('/');
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
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
            {countries.map((country) => (
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
