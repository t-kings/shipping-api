import * as yup from 'yup';
import { MAX_ALLOWED_DIMENSION } from '../constants';

export const isNumberPositivelyValid = (number?: number): boolean => {
  const schema = yup.number().required().positive().integer();
  const isValid = schema.isValidSync(number);
  return isValid;
};

export const checkDimensionSlippageForShipping = (
  dimension: number
): number => {
  return Math.round(dimension / MAX_ALLOWED_DIMENSION);
};
