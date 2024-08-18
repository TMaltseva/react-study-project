import { forwardRef } from 'react';
import { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <input {...props} ref={ref} className="input" />;
});

Input.displayName = 'Input';
