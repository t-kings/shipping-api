import type { AddressComponent } from '../interfaces';

/**
 * Converts an address component object into a string.
 * @param {AddressComponent} addressComponent - The address component object to convert to a string.
 * @returns {string} The string representation of the address component object.
 */
export const convertAddressComponentToString = ({
  city,
  houseNumber,
  street,
  country,
}: AddressComponent): string => {
  let value = '';
  if (houseNumber !== null && houseNumber !== undefined) {
    value = `${value}, ${houseNumber}`;
  }

  if (street !== null && street !== undefined) {
    value = `${value}, ${street}`;
  }

  if (city !== null && city !== undefined) {
    value = `${value}, ${city}`;
  }

  if (country !== null && country !== undefined) {
    value = `${value}, ${country}`;
  }
  return value.substring(1).trim();
};
