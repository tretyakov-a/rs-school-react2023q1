import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { registerInput, renderInput } from '.';
import { getValidators as mockGetValidators } from '../validation';
import { FormFieldOptions } from '../form-field';
import { useForm } from 'react-hook-form';
import { FormInputs } from '../types';

const mockRegister = jest.fn();
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    register: mockRegister,
  })),
}));

jest.mock('./CustomInput', () => (props: React.PropsWithChildren) => (
  <div data-testid="custom-input-testid">{props.children}</div>
));
jest.mock('./FileInput', () => (props: React.PropsWithChildren) => (
  <div data-testid="file-input-testid">{props.children}</div>
));
jest.mock('./Input', () => () => <div data-testid="input-testid"></div>);
jest.mock('./InputsList', () => () => <div data-testid="inputs-list-testid"></div>);
jest.mock('./Select', () => () => <div data-testid="select-testid"></div>);

jest.mock('../validation', () => ({
  getValidators: jest.fn(() => ({})),
}));

const mockFormFieldOptions: [FormFieldOptions, string[]][] = [
  [{ type: 'text', name: 'name' }, ['input-testid']],
  [{ type: 'file', name: 'avatar' }, ['file-input-testid', 'input-testid']],
  [{ type: 'select', name: 'country' }, ['select-testid']],
  [{ type: 'radio', name: 'subscribe' }, ['custom-input-testid', 'input-testid']],
  [
    { type: 'checkbox', name: 'programmingLanguage', formFieldType: 'list' },
    ['inputs-list-testid'],
  ],
];

describe('inputs test', () => {
  test('renderInput()', () => {
    mockFormFieldOptions.forEach(([fieldOption, testids]) => {
      render(<>{renderInput(fieldOption)}</>);
      testids.forEach((testid) => expect(screen.getByTestId(testid)).toBeInTheDocument());
      cleanup();
    });
  });

  test('registerInput()', () => {
    const TestComponent = () => {
      const { register } = useForm<FormInputs>();
      return <input {...registerInput(register)(mockFormFieldOptions[0][0])} />;
    };

    render(<TestComponent />);
    expect(mockGetValidators).toBeCalled();
    expect(mockRegister).toBeCalledWith('name', {});
  });
});
