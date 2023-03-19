import data from '@assets/cards.json';
import { isEqualProductsArrays } from './product';

describe('Product tests', () => {
  test('isEqualProductsArrays', () => {
    const array1 = [data[0], data[1]];
    const array2 = [data[0], data[1]];
    const array3 = [data[0], data[1], data[2]];
    const array4 = [data[1], data[2]];

    expect(isEqualProductsArrays(array1, array2)).toBe(true);
    expect(isEqualProductsArrays(array1, array3)).toBe(false);
    expect(isEqualProductsArrays(array1, array4)).toBe(false);
  });
});
