import type { SeasonAndPriceSurge } from '../interfaces';

/**
 * All values are in USD
 */
export const seasonsAndPriceSurge: SeasonAndPriceSurge[] = [
  {
    startDate: { month: 11, day: 10 },
    endDate: { month: 0, day: 10 },
    surge: 1.3,
    eventName: 'Christmas Season',
  },
  {
    startDate: { month: 1, day: 10 },
    endDate: { month: 1, day: 18 },
    surge: 1.15,
    eventName: 'Valentine Season',
  },
  {
    startDate: { month: 3, day: 18 },
    endDate: { month: 3, day: 25 },
    surge: 1.2,
    eventName: 'Eid Season',
  },
  {
    startDate: { month: 3, day: 7 },
    endDate: { month: 3, day: 12 },
    surge: 1.2,
    eventName: 'Easter Season',
  },
];
