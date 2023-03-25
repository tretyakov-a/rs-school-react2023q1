import { default as InputRef } from './input-ref';
import { render, screen } from '@testing-library/react';
import { FormFieldOptions } from './form-field';
import { SelectOptionData } from './data/types';

describe('InputRef class tests', () => {
  test('Works correctly with null element', () => {
    const inputRef = new InputRef();
    expect(inputRef.setValue()).toBeUndefined();
  });

  test('Works correctly with text input', () => {
    const formFieldOptions: FormFieldOptions = {
      name: 'name',
      type: 'text',
      defaultValue: 'Username',
    };
    const inputRef = new InputRef();
    render(<input ref={inputRef.ref as React.RefObject<HTMLInputElement>} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    inputRef.setValue(formFieldOptions);
    expect(input.value).toBe(formFieldOptions.defaultValue);

    inputRef.clearValue();
    expect(input.value).toBe('');
  });

  test('Works correctly with radio input', () => {
    const formFieldOptions: FormFieldOptions = {
      name: 'radio',
      type: 'radio',
      defaultValue: true,
    };
    const inputRef = new InputRef();
    render(<input type="radio" ref={inputRef.ref as React.RefObject<HTMLInputElement>} />);

    const input = screen.getByRole('radio') as HTMLInputElement;

    inputRef.setValue(formFieldOptions);
    expect(input.checked).toBe(true);

    inputRef.clearValue();
    expect(input.checked).toBe(false);
  });

  test('Works correctly with checkbox list', () => {
    //TODO
  });

  test('Works correctly with select', () => {
    const formFieldOptions: FormFieldOptions & { data: SelectOptionData[] } = {
      name: 'select',
      type: 'select',
      data: [{ name: 'option1' }, { name: 'option2' }],
      defaultValue: 'option1',
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
    expect(input.value).toBe('option1');

    inputRef.clearValue();
    expect(input.value).toBe('');
  });
});
