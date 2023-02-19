/**
 * Logs an error message to the console.
 * @param {...unknown[]} message - The error message to log.
 * @returns {void}
 */
const logError = (...message: unknown[]): void => {
  console.error(...message);
};

/**
 * An object that provides custom logging functionality.
 */
export const customLog = {
  /**
   * Logs an error message to the console.
   * @param {...unknown[]} message - The error message to log.
   * @returns {void}
   */
  error: logError,
};
