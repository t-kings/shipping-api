/**
 * An interface representing a seasonal price surge.
 * @interface
 */
export interface SeasonAndPriceSurge {
  /**
   * The start date of the seasonal surge.
   * @type {EventDate}
   */
  startDate: EventDate;

  /**
   * The end date of the seasonal surge.
   * @type {EventDate}
   */
  endDate: EventDate;

  /**
   * The surge multiplier for the season.
   * @type {number}
   */
  surge: number;

  /**
   * The name of the seasonal event.
   * @type {string}
   */
  eventName: string;
}

/**
 * An interface representing an event date.
 * @interface
 */
export interface EventDate {
  /**
   * The month of the date.
   * @type {number}
   */
  month: number;

  /**
   * The day of the date.
   * @type {number}
   */
  day: number;
}
