/**
 * Provides a function to validate environment variables against a Yup schema.
 * @module EnvironmentValidator
 */

import * as yup from 'yup';
import { EnvironmentVariables } from '../constants';
import { customLog } from '../services';

/**
 * Validates environment variables against a Yup schema and logs an error if any are missing.
 * @returns {void}
 */
export const validateEnvironmentVariables = (): void => {
  const schema = yup.string().required();
  Object.entries(EnvironmentVariables).forEach(([key, value]) => {
    const isValid = schema.isValidSync(value);
    if (!isValid) {
      customLog.error(`${key} is missing from .env file`);
      process.exit();
    }
  });
};
