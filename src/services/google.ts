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

const client = new Client();

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
        client_id: '',
        client_secret: '',
      },
    });

    const place = res.data.results[0];

    return place;
  } catch (error) {
    throw new Error('Cannot find this location');
  }
};

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
        client_id: '',
        client_secret: '',
      },
    });
    return res.data.routes[0].legs[0].distance.value;
  } catch {
    throw new Error('An internal error occurred');
  }
};
