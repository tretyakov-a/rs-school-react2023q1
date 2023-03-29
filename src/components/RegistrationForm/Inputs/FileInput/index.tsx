import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';
import React, { useContext } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { InputProps } from '../types';
import { FormInputs } from '@components/RegistrationForm/form-field';
import { getValidators } from '@components/RegistrationForm/validation';

const FileInput = (props: InputProps) => {
  const { options, register, watch } = useContext(FormFieldOptionsContext);

  const { value } = props;
  const { name, type } = options;
  const id = `${value || name}-${type}-input`;

  const watchFile = watch?.(name as keyof FormInputs) as FileList;
  return (
    <div className="custom-file-input">
      <input
        type={type}
        id={id}
        {...register?.(name as keyof FormInputs, {
          ...getValidators(options),
        })}
      />
      <label htmlFor={id}>
        <span className="custom-file-input__icon">
          <FontAwesomeIcon icon={faDownload} />
        </span>
        <span className="custom-file-input__filename">
          {!watchFile || watchFile.length === 0 ? 'Choose file...' : watchFile[0].name}
        </span>
      </label>
    </div>
  );
};

export default FileInput;
