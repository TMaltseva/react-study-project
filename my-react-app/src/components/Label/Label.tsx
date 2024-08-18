import { LabelProps } from './Label.types';

export const Label = (props: LabelProps) => {
  return (
    <label {...props} className="label">
      {props.children}
    </label>
  );
};
