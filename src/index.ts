import { validateEnvironmentVariables } from './validation';
import server from './server';
import { EnvironmentVariables } from './constants';

/**
 * Function to initialize the app
 */
const init = (): void => {
  try {
    validateEnvironmentVariables();

    // Handle uncaught exceptions and log them to console or a file
    process.on('uncaughtException', (err) => {
      console.error(`Uncaught Exception: ${err.message}`);
      console.error(err.stack);
      process.exit(1);
    });

    // Start the server and listen to the specified port
    server.listen(EnvironmentVariables.SERVER_PORT, () => {
      console.log(
        `Server listening on port ${EnvironmentVariables.SERVER_PORT}`
      );
    });
  } catch (err) {
    // Handle any errors that occur during initialization and exit the process
    console.error((err as Error).message);
    process.exit(1);
  }
};

// Call the initialization function to start the app
init();
