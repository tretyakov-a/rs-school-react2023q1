import { FormFieldOption } from '../form-fields';
import Input from './Input';
import InputsList from './InputsList';
import Select from './Select';

const renderInput = (options: FormFieldOption) => {
  const { type, inputRef } = options;
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
      return <InputsList />;
  }
};

export { Input, renderInput };
