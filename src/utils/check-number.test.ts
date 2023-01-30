import {
  checkDimensionSlippageForShipping,
  isNumberPositivelyValid,
} from './check-number';

describe('isNumberPositivelyValid', () => {
  test('should return false if number is not a number', () => {
    expect(isNumberPositivelyValid(null as unknown as number)).toBe(false);
    expect(isNumberPositivelyValid(undefined as unknown as number)).toBe(false);
    expect(isNumberPositivelyValid('not a number' as unknown as number)).toBe(
      false
    );
  });

  test('should return false if number is zero', () => {
    expect(isNumberPositivelyValid(0)).toBe(false);
  });

  test('should return false if number is less than zero', () => {
    expect(isNumberPositivelyValid(-2)).toBe(false);
  });

  test('should return true if number is greater than 0', () => {
    expect(isNumberPositivelyValid(2)).toBe(true);
  });
});

describe('checkDimensionSlippageForShipping', () => {
  test('should return the approximated number of times the max dimension can be removed from the dimension', () => {
    expect(checkDimensionSlippageForShipping(0.8)).toBe(4);
    expect(checkDimensionSlippageForShipping(0.7)).toBe(3);
    expect(checkDimensionSlippageForShipping(0.75)).toBe(4);
    expect(checkDimensionSlippageForShipping(0.71)).toBe(4);
    expect(checkDimensionSlippageForShipping(0.69)).toBe(3);
  });
});
