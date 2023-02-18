import dotenv from 'dotenv';
import type { EnvironmentVariable } from '../interfaces';
dotenv.config();

/**
 * Object containing environment variables used by the application.
 * @typedef {Object} EnvironmentVariables
 * @property {string} GOOGLE_API_KEY - The Google API key.
 */

/**
 * Environment variables used by the application.
 * @type {EnvironmentVariables}
 */
export const EnvironmentVariables: EnvironmentVariable = {
  GOOGLE_API_KEY: String(process.env.GOOGLE_API_KEY),
};
