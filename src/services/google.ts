import { Client } from '@googlemaps/google-maps-services-js';

import type {
  GeocodeResult,
  AddressType,
} from '@googlemaps/google-maps-services-js';
import type { Address } from '../interfaces';

const client = new Client({});

export const getAddressInfo = async (
  address: Address
): Promise<GeocodeResult> => {
  try {
    const res = await client.geocode({
      params: {
        address: `${address.street}, ${address.country}`,
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

export const getCity = (object: GeocodeResult): Record<string, string> => {
  const address: Record<string, string> = {};
  const addressComponents = object.address_components;
  addressComponents.reduce((element) => {
    address[element.types[0]] = element.long_name;
  });
  return address;
};
