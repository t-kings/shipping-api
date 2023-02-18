import { validateEnvironmentVariables } from './environment-variables.validation';

describe('validateEnvironmentVariables', () => {
  it('should exit the process if any environment variable is missing', () => {
    const oldGOOGLE_API_KEY = process.env.GOOGLE_CLIENT_ID;
    process.env.GOOGLE_API_KEY = undefined;

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    validateEnvironmentVariables();

    expect(consoleSpy).toHaveBeenCalledWith(
      'GOOGLE_API_KEY is missing from .env file'
    );

    process.env.GOOGLE_API_KEY = oldGOOGLE_API_KEY;

    consoleSpy.mockRestore();
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
    process.env.GOOGLE_API_KEY = '123';
    validateEnvironmentVariables();

    // Expect the mockLogError method to have been called zero times
    expect(mockLogError).toHaveBeenCalledTimes(0);

    // Reset the mock implementation
    jest.resetModules();
  });
});
