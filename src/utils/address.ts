import type { AddressComponent } from '../interfaces';

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
