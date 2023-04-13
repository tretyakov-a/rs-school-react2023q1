import { FormFieldOptionsContext } from '../../form-field/context';
import React, { useContext } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { CustomInputProps } from '../types';

const FileInput = (props: CustomInputProps) => {
  const { options, watch } = useContext(FormFieldOptionsContext);
  const { id, children } = props;
  const { name } = options;

  const watchFile = watch?.(name);
  const fileName =
    watchFile !== undefined && watchFile instanceof FileList && watchFile.length !== 0
      ? watchFile[0].name
      : 'Choose file...';
  return (
    <div className="custom-file-input">
      {children}
      <label htmlFor={id}>
        <span className="custom-file-input__icon">
          <FontAwesomeIcon icon={faDownload} />
        </span>
        <span className="custom-file-input__filename">{fileName}</span>
      </label>
    </div>
  );
};

export default FileInput;
