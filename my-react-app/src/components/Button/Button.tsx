import { ButtonProps } from './Button.types';

export const Button = (props: ButtonProps) => {
  return (
    <button {...props} className="button">
      {props.children}
    </button>
  );
};
