import dotenv from 'dotenv';
import type { EnvironmentVariable } from '../interfaces';
dotenv.config();

/**
 * Environment variables used by the application.
 * @type {EnvironmentVariables}
 */
export const EnvironmentVariables: EnvironmentVariable = {
  GOOGLE_API_KEY: String(process.env.GOOGLE_API_KEY),
  SERVER_PORT: Number(process.env.SERVER_PORT),
};
