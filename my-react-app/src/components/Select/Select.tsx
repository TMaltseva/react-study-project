import { forwardRef } from 'react';
import { SelectProps } from './Select.types';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ ...props }, ref) => {
  return <select {...props} ref={ref} className="select" />;
});

Select.displayName = 'Select';
