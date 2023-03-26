import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { default as RegistrationFormwithModal, RegistrationForm } from '.';
import React from 'react';
import { FormFieldOptions } from '@components/RegistrationForm/form-field';
import InputRef from './input-ref';

const onSubmitMock = jest.fn(() => {});
const setValueMock = jest.fn();
const clearValueMock = jest.fn();
jest.mock('./input-ref', () => {
  return jest.fn().mockImplementation(() => {
    return {
      setValue: setValueMock,
      clearValue: clearValueMock,
    };
  });
});

beforeEach(() => {
  onSubmitMock.mockClear();
  setValueMock.mockClear();
  clearValueMock.mockClear();
});

const formFields: FormFieldOptions[] = [
  {
    name: 'name',
    type: 'text',
    validation: {
      required: true,
    },
    defaultValue: 'some value',
    inputRef: new InputRef(),
  },
  {
    name: 'radio',
    type: 'radio',
  },
  {
    name: 'languages',
    label: 'Programming languages',
    type: 'checkbox',
    formFieldType: 'list',
    validation: {
      required: true,
    },
    defaultValue: true,
    data: [
      { name: 'lang1', label: 'lang1' },
      { name: 'lang2', label: 'lang1' },
    ],
    inputRef: [new InputRef(), new InputRef()],
  },
];

class ModalMock extends React.Component {
  open = (callback: () => void) => {
    setTimeout(() => {
      callback();
    }, 100);
  };
  render() {
    return <></>;
  }
}

interface withModalProps {
  modalRef: React.RefObject<ModalMock> | null;
}

const ModalMockContext = React.createContext<withModalProps>({
  modalRef: null,
});

const withModalMock =
  <P extends object>(Wrapped: React.ComponentType<P>): React.FC<Omit<P, keyof withModalProps>> =>
  (props) =>
    (
      <ModalMockContext.Consumer>
        {({ modalRef }) => <Wrapped {...(props as P)} modalRef={modalRef} />}
      </ModalMockContext.Consumer>
    );

const RegistrationFormWithMockModal = withModalMock(RegistrationForm);

const modalRef = React.createRef<ModalMock>();
const testComponent = (
  <>
    <ModalMock ref={modalRef} />
    <ModalMockContext.Provider value={{ modalRef }}>
      <RegistrationFormWithMockModal formFields={formFields} onSubmit={onSubmitMock} />
    </ModalMockContext.Provider>
  </>
);

const getElements = () => {
  const submitButton = screen.getByRole('button', { name: /submit/i }) as HTMLButtonElement;
  const fillButton = screen.getByRole('button', {
    name: /fill with test values/i,
  }) as HTMLButtonElement;
  const textbox = screen.getByRole('textbox') as HTMLInputElement;
  const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
  return { submitButton, fillButton, textbox, checkboxes };
};

describe('<HeaderMenu /> test', () => {
  test('Should render properly', () => {
    render(<RegistrationFormwithModal formFields={formFields} onSubmit={onSubmitMock} />);

    const { submitButton, fillButton, textbox } = getElements();

    expect(screen.getByRole('heading', { name: /registration/i })).toBeInTheDocument();
    expect(textbox).toBeInTheDocument();
    expect(textbox.value).toBe('some value');
    expect(submitButton).toBeInTheDocument();
    expect(fillButton).toBeInTheDocument();
  });

  test('Should call clear method after submit and confirmation', async () => {
    render(testComponent);
    const { submitButton, checkboxes, textbox } = getElements();

    fireEvent.click(submitButton);
    expect(onSubmitMock).toBeCalled();
    checkboxes.forEach((el) => (el.checked = true));
    textbox.value = 'test';

    await waitFor(
      () => {
        expect(clearValueMock).toBeCalled();
      },
      { timeout: 200 }
    );
  });

  test('Should not submit on errors', () => {
    render(testComponent);
    const { submitButton, textbox } = getElements();

    textbox.value = '';
    fireEvent.click(submitButton);
    expect(onSubmitMock).not.toBeCalled();
  });

  test('Should call fill method on fill btn click', () => {
    render(testComponent);
    const { fillButton } = getElements();

    fireEvent.click(fillButton);
    expect(setValueMock).toBeCalled();
  });
});
