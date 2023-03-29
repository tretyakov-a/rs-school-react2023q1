import { default as InputRef } from './input-ref';
import { render, screen } from '@testing-library/react';
import { SelectOptionData } from './data/types';
import { FormFieldOptions, getDefaultValue } from '@components/RegistrationForm/form-field';
import { RadioInputData } from './data/types';

const testDefaultValue = 'test-default';
jest.mock('@components/RegistrationForm/form-field', () => ({
  getDefaultValue: jest.fn((field: FormFieldOptions) => (field ? testDefaultValue : null)),
}));

describe('InputRef class tests', () => {
  test('Works correctly with null element', () => {
    const inputRef = new InputRef();
    expect(inputRef.setValue()).toBeUndefined();
  });

  test('Works correctly with text input', () => {
    const formFieldOptions: FormFieldOptions = {
      name: 'name',
      type: 'text',
    };
    const inputRef = new InputRef();
    render(<input type="text" ref={inputRef.ref as React.RefObject<HTMLInputElement>} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    inputRef.setValue(formFieldOptions);
    expect(input.value).toBe(testDefaultValue);

    inputRef.clearValue();
    expect(input.value).toBe('');
  });

  test('Works correctly with file input', () => {
    const formFieldOptions: FormFieldOptions = {
      name: 'file',
      type: 'file',
    };
    const inputRef = new InputRef();
    render(
      <input type="file" role="file" ref={inputRef.ref as React.RefObject<HTMLInputElement>} />
    );

    const input = screen.getByRole('file') as HTMLInputElement;
    const dispatcEventSpy = jest.spyOn(input, 'dispatchEvent');

    inputRef.setValue(formFieldOptions);
    expect(dispatcEventSpy).toBeCalledTimes(1);
  });

  test('Works correctly with select', () => {
    const formFieldOptions: FormFieldOptions & { data: SelectOptionData[] } = {
      name: 'select',
      type: 'select',
      data: [{ name: testDefaultValue }, { name: 'option2' }],
    };
    const inputRef = new InputRef();
    render(
      <select ref={inputRef.ref as React.RefObject<HTMLSelectElement>}>
        <option value="" disabled hidden>
          {''}
        </option>
        {formFieldOptions.data?.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    );

    const input = screen.getByRole('combobox') as HTMLSelectElement;

    inputRef.setValue(formFieldOptions);
    expect(input.value).toBe(testDefaultValue);

    inputRef.clearValue();
    expect(input.value).toBe('');
  });

  test('Works correctly with radio input', () => {
    const testDefaultRadio = true;
    (getDefaultValue as jest.Mock).mockImplementation((field: FormFieldOptions) =>
      field ? testDefaultRadio : null
    );
    const formFieldOptions: FormFieldOptions = {
      name: 'radio',
      type: 'radio',
    };
    const inputRef = new InputRef();
    render(<input type="radio" ref={inputRef.ref as React.RefObject<HTMLInputElement>} />);

    const input = screen.getByRole('radio') as HTMLInputElement;

    inputRef.setValue(formFieldOptions);
    expect(input.checked).toBe(testDefaultRadio);

    inputRef.clearValue();
    expect(input.checked).toBe(false);
  });

  test('Works correctly with checkbox list', () => {
    const formFieldOptions: FormFieldOptions = {
      name: 'checkbox-list',
      type: 'checkbox',
      formFieldType: 'list',
    };
    const inputRef = new InputRef();
    render(<input type="checkbox" ref={inputRef.ref as React.RefObject<HTMLInputElement>} />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;

    inputRef.setValue(formFieldOptions);
    expect(input.value).toBe(formFieldOptions.name);
  });
});
