/**
 * Logs an error message to the console.
 * @param {string} message - The error message to log.
 * @returns {void}
 */
const logError = (message: string): void => {
  console.error(message);
};

export const customLog = {
  error: logError,
};
