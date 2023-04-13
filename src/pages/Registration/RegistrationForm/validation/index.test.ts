import { getEmptyFileListMock, getFileListMock } from '@src/__mocks__/file-instance-mock';
import { FormFieldOptions } from '../form-field';
import { getValidators, nonStandardValidators } from '.';
import * as helpers from '@common/helpers';

const helpersMock = helpers as { getAge: (date?: string) => number };

jest.mock('@common/helpers', () => ({
  __esModule: true,
  getAge: () => 16,
}));

const testMessage = 'test message';
jest.mock('./messages', () => ({
  getValidationMessage: jest.fn(() => () => 'test message'),
}));

const mockFormField: FormFieldOptions = {
  name: 'name',
  type: 'text',
  validation: {
    required: true,
    capitalized: true,
    minLength: 3,
    maxLength: 12,
    pattern: /^[\w]+$/,
  },
};

const noValidationField: FormFieldOptions = {
  name: 'birthday',
  type: 'date',
};

describe('Validation tests', () => {
  test('getValidators()', () => {
    const validators = getValidators(mockFormField);
    if (!validators) return;

    expect(validators).toHaveProperty('validate');
    expect(validators).toHaveProperty('required');
    expect(validators).toHaveProperty('minLength');
    expect(validators).toHaveProperty('maxLength');
    expect(validators.validate).toHaveProperty('capitalized');
    expect(getValidators(noValidationField)).toBeNull();
  });

  test('capitalizedValidator()', () => {
    const capitalized = nonStandardValidators.capitalized(true);

    expect(capitalized('Test')).toBe(true);
    expect(capitalized('test')).toBe(testMessage);
  });

  test('maxFileSizeValidator()', () => {
    const maxFileSize100 = nonStandardValidators.maxFileSize(100);
    const maxFileSize1000 = nonStandardValidators.maxFileSize(1000);

    const fileList = getFileListMock();
    const emptyFileList = getEmptyFileListMock();

    expect(maxFileSize100(fileList)).toBe(testMessage);
    expect(maxFileSize1000(fileList)).toBe(true);
    expect(maxFileSize100(emptyFileList)).toBeUndefined();
    expect(maxFileSize100({} as FileList)).toBeUndefined();
  });

  test('fileType()', () => {
    const fileType = nonStandardValidators.fileType('image');

    const fileImageList = getFileListMock();
    const fileTextList = getFileListMock('text');
    const emptyFileList = getEmptyFileListMock();

    expect(fileType(fileImageList)).toBe(true);
    expect(fileType(fileTextList)).toBe(testMessage);
    expect(fileType(emptyFileList)).toBeUndefined();
  });

  test('ageValidator()', () => {
    const age = nonStandardValidators.age(16);

    expect(age('2001-01-01')).toBe(true);
    helpersMock.getAge = () => 12;
    expect(age('2011-01-01')).toBe(testMessage);
    expect(age('')).toBeUndefined();
  });
});
