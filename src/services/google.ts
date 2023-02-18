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

/**
 * The Google Maps client ID to be used to access the API.
 */
const clientId = EnvironmentVariables.GOOGLE_CLIENT_ID;

/**
 * The Google Maps client secret to be used to access the API.
 */
const clientSecret = EnvironmentVariables.GOOGLE_CLIENT_SECRET;

/**
 * The Google Maps API client.
 */
const client = new Client();

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
    const res = await client.geocode({
      params: {
        address: formattedAddress,
        client_id: clientId,
        client_secret: clientSecret,
      },
    });

    const place = res.data.results[0];

    return place;
  } catch (error) {
    throw new Error('Cannot find this location');
  }
};

/**
 * Returns the city and country for a given geocode result.
 * @param {GeocodeResult} geocodeResult - The geocode result to get the city and country from.
 * @returns {{ city: string; country: string }} The city and country for the geocode result.
 * @throws {Error} If the city or country cannot be found in the geocode result.
 */
export const getCityAndCountry = (
  geocodeResult: GeocodeResult
): { city: string; country: string } => {
  const components = geocodeResult.address_components;
  const componentWithLocality = components.find((c) =>
    c.types.includes(PlaceType2.locality)
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
    const res = await client.directions({
      params: {
        origin,
        destination,
        mode: TravelMode.driving,
        client_id: clientId,
        client_secret: clientSecret,
      },
    });

    return res.data.routes[0].legs[0].distance.value;
  } catch {
    throw new Error('An internal error occurred');
  }
};
