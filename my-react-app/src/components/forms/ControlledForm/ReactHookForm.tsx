import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { setControlledData } from '../../../store/formSlice';
import { AppDispatch } from '../../../store/store';
import { validCountries } from '../../../data/countries';
import { validationSchema } from '../../../schemas/validationSchema';
import { Button, Input, Label, Select } from '../../index';
import { LabelName } from '../../../constants/labelName';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: FileList;
  country: string;
}

const resolver: Resolver<IFormInput> = yupResolver(validationSchema) as unknown as Resolver<IFormInput>;

export const ControlledForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver,
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const formDataWithImage = {
        ...data,
        picture: base64String,
      };
      dispatch(setControlledData(formDataWithImage));
    };
    if (data.picture && data.picture[0]) {
      reader.readAsDataURL(data.picture[0]);
    }
  };

  const generateInput = (label: string, type: 'file' | 'text' | 'checkbox' = 'text') => {
    return (
      <div key={label} className="wrapper">
        <div className="input_item">
          <Label htmlFor={label}>{label}</Label>
          <Input {...register(label as keyof IFormInput)} id={label} type={type} />
        </div>
        {errors[label as keyof IFormInput] && <p className="errors">{errors[label as keyof IFormInput]?.message}</p>}
      </div>
    );
  };

  const generateOptions = (label: string) => {
    return (
      <div key={label} className="wrapper">
        <div className="input_item">
          <Label htmlFor={label}>{label}</Label>
          <Select {...register(label as keyof IFormInput)} id={label}>
            <option value="">Select a country</option>
            {validCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </div>
        {errors.country && <p className="errors">{errors.country.message}</p>}
      </div>
    );
  };

  const generateGenderSelect = () => {
    return (
      <div key="gender" className="wrapper">
        <div className="input_item">
          <Label htmlFor="gender">Gender</Label>
          <Select {...register('gender')} id="gender">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
        {errors.gender && <p className="errors">{errors.gender.message}</p>}
      </div>
    );
  };

  return (
    <div className="controlled">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
