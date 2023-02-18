import * as yup from 'yup';
import { EnvironmentVariables } from '../constants';
import { logError } from '../services';

const schema = yup.string().required();
Object.entries(EnvironmentVariables).forEach(([key, value]) => {
  const isValid = schema.isValidSync(EnvironmentVariables);
  if (!isValid) {
    logError(`${key} is missing from .env file`);
  }
});
