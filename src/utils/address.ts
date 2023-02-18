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
    value = `, ${houseNumber}`;
  }

  if (street !== null && street !== undefined) {
    value = `, ${street}`;
  }

  if (city !== null && city !== undefined) {
    value = `, ${city}`;
  }

  if (country !== null && country !== undefined) {
    value = `, ${country}`;
  }
  return value.replace(', ', '').trim();
};
