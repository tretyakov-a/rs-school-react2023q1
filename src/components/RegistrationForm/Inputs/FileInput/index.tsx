import { FormFieldOptionsContext } from '@components/RegistrationForm/form-field/context';
import React, { useContext, useState } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { InputAttributes, InputProps } from '../types';

const FileInput = (props: InputProps) => {
  const { options } = useContext(FormFieldOptionsContext);
  const [filename, setFilename] = useState<string>('');

  const handleFileInputChange = (e: React.SyntheticEvent) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;

    const filename = el.files !== null && el.files.length > 0 ? el.files[0].name : '';

    setFilename(filename);
  };

  const { inputRef, value } = props;
  const { name, type } = options;
  const id = `${value || name}-${type}-input`;
  const inputPprops: InputAttributes = {
    ref: inputRef as React.RefObject<HTMLInputElement>,
    type,
    name,
    id,
  };
  inputPprops.accept = 'image/*';

  return (
    <div className="custom-file-input">
      <input {...inputPprops} onInput={handleFileInputChange} />
      <label htmlFor={`${name}-${type}-input`}>
        <span className="custom-file-input__icon">
          <FontAwesomeIcon icon={faDownload} />
        </span>
        <span className="custom-file-input__filename">
          {filename === '' ? 'Choose file...' : filename}
        </span>
      </label>
    </div>
  );
};

export default FileInput;
