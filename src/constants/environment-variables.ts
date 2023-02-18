import dotenv from 'dotenv';
import type { EnvironmentVariable } from '../interfaces';
dotenv.config();

/**
 * Object containing environment variables used by the application.
 * @typedef {Object} EnvironmentVariables
 * @property {string} GOOGLE_CLIENT_ID - The Google OAuth client ID.
 * @property {string} GOOGLE_CLIENT_SECRET - The Google OAuth client secret.
 */

/**
 * Environment variables used by the application.
 * @type {EnvironmentVariables}
 */
export const EnvironmentVariables: EnvironmentVariable = {
  GOOGLE_CLIENT_ID: String(process.env.GOOGLE_CLIENT_ID),
  GOOGLE_CLIENT_SECRET: String(process.env.GOOGLE_CLIENT_SECRET),
};
