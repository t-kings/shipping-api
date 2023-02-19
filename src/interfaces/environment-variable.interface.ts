/**
 * An interface representing environment variables for the Google API.
 * @interface
 */
export interface EnvironmentVariable {
  /**
   * The Google api key
   * @type {string}
   */
  GOOGLE_API_KEY: string;

  /**
   * The server port for this app to listen to http requests
   * @type {number}
   */
  SERVER_PORT: number;
}
