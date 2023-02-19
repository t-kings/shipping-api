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
 * @throws {error} when an env variable is missing
 */
export const validateEnvironmentVariables = (): void => {
  const schema = yup
    .object({
      GOOGLE_API_KEY: yup.string().required(),
      SERVER_PORT: yup.number().required(),
    })
    .required();
  try {
    schema.validateSync(EnvironmentVariables);
  } catch (err) {
    const error = err as yup.ValidationError;
    const message = `Environment variables validation failed => ${error.errors.join(
      ', '
    )}`;
    customLog.error(message);
    throw new Error(message);
  }
};
