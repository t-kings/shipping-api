import type { CityAndBasePriceValue, SeasonAndPriceSurge } from '../interfaces';
import { cityAndBasePrice } from '../resources';
import { seasonsAndPriceSurge } from '../resources/seasons-and-price-surge';

export const getBasePriceOfCity = (
  country: string,
  city: string
): CityAndBasePriceValue => {
  try {
    return cityAndBasePrice[country][city];
  } catch {
    throw new Error('Location not supported yet');
  }
};

export const getSeasonsPriceSurge = (date?: string): number => {
  try {
    let dateObject = new Date();
    if (date !== '' && date !== null && date !== undefined) {
      dateObject = new Date(date);
    }
    const year = dateObject.getFullYear();
    const dateInMilliseconds = dateObject.getTime();
    const season = seasonsAndPriceSurge.find(
      ({ startDate, endDate }: SeasonAndPriceSurge) => {
        const startDay = new Date(
          `${year}-${startDate.month}-${startDate.day}`
        ).getTime();
        const endDay = new Date(
          `${year}-${endDate.month}-${endDate.day}`
        ).getTime();
        if (startDay <= dateInMilliseconds && endDay >= dateInMilliseconds) {
          return true;
        }
        return false;
      }
    );

    if (season?.surge !== null && season?.surge !== undefined) {
      return season.surge;
    }
    return 1;
  } catch {
    throw new Error('Invalid date provided');
  }
};

export const getCostOfOneMeter = (
  city: string,
  country: string,
  dateOfShipping?: string
): number => {
  /**
   * TODO: Get the number of requests in that city by that time and estimate the significant increase in price
   */
  const { basePrice, fuelSurge } = getBasePriceOfCity(country, city);

  const seasonPriceSurge = getSeasonsPriceSurge(dateOfShipping);

  return basePrice * fuelSurge * seasonPriceSurge;
};
