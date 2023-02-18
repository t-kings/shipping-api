/**
 * This module provides functions for interfacing with the Google Maps API and getting information about locations and distances between locations.
 * @module GoogleMapsService
 */

import {
  Client,
  PlaceType2,
  TravelMode,
} from '@googlemaps/google-maps-services-js';

import type {
  GeocodeResult,
  LatLng,
} from '@googlemaps/google-maps-services-js';

import type { Address } from '../interfaces';
import { convertAddressComponentToString } from '../utils';
import { EnvironmentVariables } from '../constants';
import { customLog } from './logger.service';

/**
 * The Google Maps api key to be used to access the API.
 */
const key = EnvironmentVariables.GOOGLE_API_KEY;

/**
 * The Google Maps API client.
 */
export const googleClient = new Client();

/**
 * Returns the Google Maps API geocode result for a given address.
 * @param {Address} address - The address to be geocoded.
 * @returns {Promise<GeocodeResult>} The Google Maps API geocode result for the address.
 * @throws {Error} If the address cannot be geocoded.
 */
export const getAddressInfo = async (
  address: Address
): Promise<GeocodeResult> => {
  try {
    let formattedAddress = '';
    if (typeof address === 'string') {
      formattedAddress = address;
    } else {
      formattedAddress = convertAddressComponentToString(address);
    }
    const res = await googleClient.geocode({
      params: {
        address: formattedAddress,
        key,
      },
    });

    const place = res.data.results[0];
    if (place === undefined || place === null) {
      throw new Error('Cannot find this location');
    }
    return place;
  } catch (error) {
    customLog.error((error as Error).message);
    throw new Error('Cannot find this location');
  }
};

/**
 * Retrieves the city and country information for a given geocode result.
 *
 * @param {GeocodeResult.address_components} components - The geocode result to extract the city and country from.
 * @returns {{city: string, country: string}} The extracted city and country.
 * @throws {Error} If the city or country information cannot be found in the geocode result.
 */
export const getCityAndCountry = (
  components: GeocodeResult['address_components']
): { city: string; country: string } => {
  const componentWithLocality = components.find((c) =>
    c.types.includes(PlaceType2.administrative_area_level_1)
  );

  const componentWithCountry = components.find((c) =>
    c.types.includes(PlaceType2.country)
  );

  const city = componentWithLocality?.long_name;
  const country = componentWithCountry?.long_name;

  if (city === undefined) {
    throw new Error('City cannot be gotten from this address');
  }

  if (country === undefined) {
    throw new Error('Country cannot be gotten from this address');
  }

  return { city, country };
};

/**
 * Returns the driving distance between two locations.
 * @param {LatLng} origin - The starting location.
 * @param {LatLng} destination - The destination location.
 * @returns {Promise<number>} The driving distance between the locations in meters.
 * @throws {Error} If an error occurs while getting the distance.
 */
export const getDistance = async (
  origin: LatLng,
  destination: LatLng
): Promise<number> => {
  try {
    const res = await googleClient.directions({
      params: {
        origin,
        destination,
        mode: TravelMode.driving,
        key,
      },
    });

    return res.data.routes[0].legs[0].distance.value;
  } catch {
    throw new Error('An internal error occurred');
  }
};
