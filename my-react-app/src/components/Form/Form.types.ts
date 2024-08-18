import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';

export interface FormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  children: ReactNode;
}
