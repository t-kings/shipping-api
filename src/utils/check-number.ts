import * as yup from 'yup';
import { MAX_ALLOWED_DIMENSION } from '../constants';

/**
 * Checks if a given number is a positive integer.
 *
 * @param {number} number - The number to be validated.
 * @returns {boolean} - Returns `true` if the number is a positive integer, otherwise returns `false`.
 * @throws {Error} - Throws an error if the input is invalid.
 */
export const isNumberPositivelyValid = (number?: number): boolean => {
  const schema = yup.number().required().positive().integer();
  const isValid = schema.isValidSync(number);
  return isValid;
};

/**
 * Calculates the number of times the package must be split due to exceeding maximum allowed dimension.
 *
 * @param {number} dimension - The dimension of the package.
 * @returns {number} - Returns the number of times the package must be split.
 */
export const checkDimensionSlippageForShipping = (
  dimension: number
): number => {
  return Math.round(dimension / MAX_ALLOWED_DIMENSION);
};
