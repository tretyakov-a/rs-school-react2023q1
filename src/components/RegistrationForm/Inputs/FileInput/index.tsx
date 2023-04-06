import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';
import React, { useContext } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FormInputs } from '@components/RegistrationForm/types';
import { CustomInputProps } from '../types';

const FileInput = (props: CustomInputProps) => {
  const { options, watch } = useContext(FormFieldOptionsContext);
  const { id, children } = props;
  const { name } = options;

  const watchFile = watch?.(name as keyof FormInputs) as FileList;
  return (
    <div className="custom-file-input">
      {children}
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
