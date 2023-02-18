import { validateEnvironmentVariables } from './environment-variables.validation';

describe('validateEnvironmentVariables', () => {
  it('should not exit the process if all environment variables are present', () => {
    // Mock the customLog.error method so we can check if it is called
    const mockLogError = jest.fn();
    jest.mock('../services', () => ({
      customLog: {
        error: mockLogError,
      },
    }));

    // Call the function with all environment variables present
    process.env.GOOGLE_API_KEY = '123';
    validateEnvironmentVariables();

    // Expect the mockLogError method to have been called zero times
    expect(mockLogError).toHaveBeenCalledTimes(0);

    // Reset the mock implementation
    jest.resetModules();
  });
});
