/**
 * An interface representing environment variables for the Google API.
 * @interface
 */
export interface EnvironmentVariable {
  /**
   * The Google client ID.
   * @type {string}
   */
  GOOGLE_CLIENT_ID: string;

  /**
   * The Google client secret.
   * @type {string}
   */
  GOOGLE_CLIENT_SECRET: string;
}
