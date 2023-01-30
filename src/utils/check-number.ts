import * as yup from 'yup';
import {
  MAX_ALLOWED_AREA,
  MAX_ALLOWED_VOLUME,
  MAX_ALLOWED_DIMENSION,
} from '../constants';

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

export const checkVolumeSlippageForShipping = (volume: number): number => {
  return Math.round(volume / MAX_ALLOWED_VOLUME);
};

export const checkAreaSlippageForShipping = (area: number): number => {
  return Math.round(area / MAX_ALLOWED_AREA);
};
