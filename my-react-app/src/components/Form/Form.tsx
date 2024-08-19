import { FormProps } from './Form.types';

export const Form = (props: FormProps) => {
  return (
    <form {...props} className="form">
      {props.children}
    </form>
  );
};
