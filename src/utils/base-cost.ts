import type { Countries } from '../enums';
import type { CityAndBasePriceValue, SeasonAndPriceSurge } from '../interfaces';
import { cityAndBasePrice } from '../resources';
import { seasonsAndPriceSurge } from '../resources/seasons-and-price-surge';

/**
 * Returns the base price and fuel surge of a city in a given country.
 *
 * @param {Countries} country - The country of the city.
 * @param {string} city - The name of the city.
 * @returns {CityAndBasePriceValue} The base price and fuel surge of the city.
 * @throws {Error} If the location is not supported yet.
 */
export const getBasePriceOfCity = (
  country: Countries,
  city: string
): CityAndBasePriceValue => {
  try {
    return cityAndBasePrice[country][city];
  } catch {
    throw new Error('Location not supported yet');
  }
};

/**
 * Returns the price surge based on the season of a given date.
 *
 * @param {string} [date] - The date to check the season for. Defaults to the current date.
 * @returns {number} The price surge based on the season.
 * @throws {Error} If the date provided is invalid.
 */
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

/**
 * Returns the cost of one meter of shipping in a city of a given country and date.
 *
 * @param {string} city - The name of the city.
 * @param {Countries} country - The country of the city.
 * @param {string} [dateOfShipping] - The date of shipping. Defaults to the current date.
 * @returns {number} The cost of one meter of shipping.
 * @todo Get the number of requests in that city by that time and estimate the significant increase in price.
 */
export const getCostOfOneMeter = (
  city: string,
  country: Countries,
  dateOfShipping?: string
): number => {
  const { basePrice, fuelSurge } = getBasePriceOfCity(country, city);

  const seasonPriceSurge = getSeasonsPriceSurge(dateOfShipping);

  return basePrice * fuelSurge * seasonPriceSurge;
};
