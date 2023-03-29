// import { screen, render, fireEvent, waitFor } from '@testing-library/react';
// import RegistrationForm from '.';
// import { FormFieldOptions } from '@components/RegistrationForm/form-field';
// import InputRef from './input-ref';
// import { ModalContext, useModal } from '@components/Modal/context';
// import Modal from '@components/Modal';

// const onSubmitMock = jest.fn(() => {});
// const setValueMock = jest.fn();
// const clearValueMock = jest.fn();
// jest.mock('./input-ref', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       setValue: setValueMock,
//       clearValue: clearValueMock,
//     };
//   });
// });

// beforeEach(() => {
//   onSubmitMock.mockClear();
//   setValueMock.mockClear();
//   clearValueMock.mockClear();
// });

// const formFields: FormFieldOptions[] = [
//   {
//     name: 'name',
//     type: 'text',
//     validation: {
//       required: true,
//     },
//     defaultValue: 'some value',
//     inputRef: new InputRef(),
//   },
//   {
//     name: 'radio',
//     type: 'radio',
//   },
//   {
//     name: 'languages',
//     label: 'Programming languages',
//     type: 'checkbox',
//     formFieldType: 'list',
//     validation: {
//       required: true,
//     },
//     defaultValue: true,
//     data: [
//       { name: 'lang1', label: 'lang1' },
//       { name: 'lang2', label: 'lang1' },
//     ],
//     inputRef: [new InputRef(), new InputRef()],
//   },
// ];

// const TestComponent = () => {
//   const { modal, setModal } = useModal();
//   return (
//     <>
//       <ModalContext.Provider value={{ modal, setModal }}>
//         <Modal />
//         <RegistrationForm formFields={formFields} onSubmit={onSubmitMock} />
//       </ModalContext.Provider>
//     </>
//   );
// };

// const getElements = () => {
//   const submitButton = screen.getByRole('button', { name: /submit/i }) as HTMLButtonElement;
//   const fillButton = screen.getByRole('button', {
//     name: /fill with test values/i,
//   }) as HTMLButtonElement;
//   const textbox = screen.getByRole('textbox') as HTMLInputElement;
//   const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
//   return { submitButton, fillButton, textbox, checkboxes };
// };

// describe('<HeaderMenu /> test', () => {
//   test('Should render correctly', () => {
//     render(<RegistrationForm formFields={formFields} onSubmit={onSubmitMock} />);

//     const { submitButton, fillButton, textbox } = getElements();

//     expect(screen.getByRole('heading', { name: /registration/i })).toBeInTheDocument();
//     expect(textbox).toBeInTheDocument();
//     expect(textbox.value).toBe('some value');
//     expect(submitButton).toBeInTheDocument();
//     expect(fillButton).toBeInTheDocument();
//   });

//   test('Should call clear method after submit and confirmation', async () => {
//     render(<TestComponent />);
//     const { submitButton, checkboxes, textbox } = getElements();

//     fireEvent.click(submitButton);
//     expect(onSubmitMock).toBeCalled();
//     checkboxes.forEach((el) => (el.checked = true));
//     textbox.value = 'test';

//     await waitFor(
//       () => {
//         expect(clearValueMock).toBeCalled();
//       },
//       { timeout: 200 }
//     );
//   });

//   test('Should not submit on errors', () => {
//     render(<TestComponent />);
//     const { submitButton, textbox } = getElements();

//     textbox.value = '';
//     fireEvent.click(submitButton);
//     expect(onSubmitMock).not.toBeCalled();
//   });

//   test('Should call fill method on fill btn click', () => {
//     render(<TestComponent />);
//     const { fillButton } = getElements();

//     fireEvent.click(fillButton);
//     expect(setValueMock).toBeCalled();
//   });
// });
