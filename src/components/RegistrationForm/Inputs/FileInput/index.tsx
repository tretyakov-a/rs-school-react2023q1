import { withFormFieldOptions } from '@components/RegistrationForm/form-field/context';
import React from 'react';
import './style.scss';
import { InputAttributes, InputProps } from '../Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

interface FileInputState {
  filename: string;
}

class FileInput extends React.Component<InputProps, FileInputState> {
  constructor(props: InputProps) {
    super(props);
    this.state = {
      filename: '',
    };
  }

  handleFileInputChange = (e: React.SyntheticEvent) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;

    const filename = el.files !== null && el.files.length > 0 ? el.files[0].name : '';

    this.setState({ filename });
  };

  render() {
    const {
      options: { name, type },
      inputRef,
      value,
    } = this.props;
    const { filename } = this.state;
    const id = `${value || name}-${type}-input`;
    const props: InputAttributes = {
      ref: inputRef as React.RefObject<HTMLInputElement>,
      type,
      name,
      id,
    };
    props.accept = 'image/*';

    return (
      <div className="custom-file-input">
        <input {...props} onInput={this.handleFileInputChange} />
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
  }
}

export default withFormFieldOptions(FileInput);
