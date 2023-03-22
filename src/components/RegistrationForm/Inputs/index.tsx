import { FormFieldOptions } from '../form-field';
import Input from './Input';
import InputsList from './InputsList';
import Select from './Select';

const renderInput = (options: FormFieldOptions) => {
  const { type, inputRef, formFieldType } = options;
  const ref = (inputRef !== undefined && !Array.isArray(inputRef) && inputRef.ref) || null;
  switch (type) {
    case 'text':
    case 'password':
    case 'date':
    case 'email':
    case 'file':
      return <Input inputRef={ref} />;
    case 'select':
      return <Select inputRef={ref} />;
    case 'radio':
    case 'checkbox':
      return formFieldType !== undefined && formFieldType === 'list' ? (
        <InputsList />
      ) : (
        <Input inputRef={ref} />
      );
  }
};

export { Input, renderInput };
