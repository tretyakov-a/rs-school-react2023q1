import { UseFormRegister } from 'react-hook-form';
import { FormFieldOptions } from '../form-field';
import CustomInput from './CustomInput';
import FileInput from './FileInput';
import Input from './Input';
import InputsList from './InputsList';
import Select from './Select';
import { FormInputs } from '../types';
import { getValidators } from '../validation';

const registerInput = (register: UseFormRegister<FormInputs>) => (options: FormFieldOptions) => {
  const { name } = options;
  return register(name, { ...getValidators(options) });
};

const renderInput = (options: FormFieldOptions) => {
  const { type, formFieldType, name } = options;
  const id = `${name}-${type}-input`;
  switch (type) {
    case 'text':
    case 'password':
    case 'date':
    case 'email':
      return <Input />;
    case 'file':
      return (
        <FileInput id={id}>
          <Input />
        </FileInput>
      );
    case 'select':
      return <Select />;
    case 'radio':
    case 'checkbox':
      return formFieldType === 'list' ? (
        <InputsList />
      ) : (
        <CustomInput id={id} type="switch">
          <Input />
        </CustomInput>
      );
  }
};

export { renderInput, registerInput };
