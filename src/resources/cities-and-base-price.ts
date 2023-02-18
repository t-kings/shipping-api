import { Countries } from '../enums';
import type { CityAndBasePriceValue } from '../interfaces';

/**
 * A mapping of cities within each country to their base prices and fuel surges
 * All values are in USD
 */
export const cityAndBasePrice: Record<
  Countries,
  Record<string, CityAndBasePriceValue>
> = {
  [Countries.Nigeria]: {
    lagos: { basePrice: 0.02, fuelSurge: 1.5 },
    enugu: { basePrice: 0.02, fuelSurge: 1.5 },
    abuja: { basePrice: 0.02, fuelSurge: 1.5 },
  },
};
