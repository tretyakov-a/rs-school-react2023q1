import { FormFieldOptions } from '../form-field';
import FileInput from './FileInput';
import Input from './Input';
import InputsList from './InputsList';
import Select from './Select';
import Switch from './Switch';

const renderInput = (options: FormFieldOptions) => {
  const { type, formFieldType } = options;

  switch (type) {
    case 'text':
    case 'password':
    case 'date':
    case 'email':
      return <Input />;
    case 'file':
      return <FileInput />;
    case 'select':
      return <Select />;
    case 'radio':
    case 'checkbox':
      return formFieldType !== undefined && formFieldType === 'list' ? <InputsList /> : <Switch />;
  }
};

export { Input, renderInput };
