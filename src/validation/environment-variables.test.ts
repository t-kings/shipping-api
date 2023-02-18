import { validateEnvironmentVariables } from './environment-variables.validation';

describe('validateEnvironmentVariables', () => {
  it('should exit the process if any environment variable is missing', () => {
    // Mock the customLog.error method so we can check if it is called
    const mockLogError = jest.fn();
    jest.mock('../services', () => ({
      customLog: {
        error: mockLogError,
      },
    }));

    // Call the function with one missing environment variable
    process.env.MISSING_VAR = undefined;
    validateEnvironmentVariables();

    // Expect the mockLogError method to have been called once
    expect(mockLogError).toHaveBeenCalledTimes(1);

    // Reset the mock implementation
    jest.resetModules();
  });

  it('should not exit the process if all environment variables are present', () => {
    // Mock the customLog.error method so we can check if it is called
    const mockLogError = jest.fn();
    jest.mock('../services', () => ({
      customLog: {
        error: mockLogError,
      },
    }));

    // Call the function with all environment variables present
    process.env.GOOGLE_CLIENT_ID = '123';
    process.env.GOOGLE_CLIENT_SECRET = '456';
    validateEnvironmentVariables();

    // Expect the mockLogError method to have been called zero times
    expect(mockLogError).toHaveBeenCalledTimes(0);

    // Reset the mock implementation
    jest.resetModules();
  });
});
