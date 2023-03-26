import { FormFieldOptions } from '../form-field';
import FileInput from './FileInput';
import Input from './Input';
import InputsList from './InputsList';
import Select from './Select';
import Switch from './Switch';

const renderInput = (options: FormFieldOptions) => {
  const { type, inputRef, formFieldType } = options;
  const ref = (inputRef !== undefined && !Array.isArray(inputRef) && inputRef.ref) || null;
  switch (type) {
    case 'text':
    case 'password':
    case 'date':
    case 'email':
      return <Input inputRef={ref} />;
    case 'file':
      return <FileInput inputRef={ref} />;
    case 'select':
      return <Select inputRef={ref} />;
    case 'radio':
    case 'checkbox':
      return formFieldType !== undefined && formFieldType === 'list' ? (
        <InputsList />
      ) : (
        <Switch inputRef={ref} />
      );
  }
};

export { Input, renderInput };
