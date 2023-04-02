import './style.scss';
import { CustomInputProps } from '../types';

const CustomInput = (props: CustomInputProps) => {
  const { id, label, children, type } = props;

  const baseClassName = type || 'custom-input';
  return (
    <div className={baseClassName}>
      {children}
      <label htmlFor={id}>
        <span className={`${baseClassName}__check`}></span>
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

export default CustomInput;
