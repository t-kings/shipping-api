import type { SeasonAndPriceSurge } from '../interfaces';

/**
 * An array of seasonal price surges and their corresponding event names
 * All values are in USD
 */
export const seasonsAndPriceSurge: SeasonAndPriceSurge[] = [
  {
    startDate: { month: 12, day: 10 },
    endDate: { month: 0, day: 10 },
    surge: 1.3,
    eventName: 'Christmas Season',
  },
  {
    startDate: { month: 2, day: 10 },
    endDate: { month: 2, day: 18 },
    surge: 1.15,
    eventName: 'Valentine Season',
  },
  {
    startDate: { month: 2, day: 18 },
    endDate: { month: 2, day: 25 },
    surge: 1.2,
    eventName: 'Eid Season',
  },
  {
    startDate: { month: 4, day: 7 },
    endDate: { month: 4, day: 12 },
    surge: 1.2,
    eventName: 'Easter Season',
  },
];
