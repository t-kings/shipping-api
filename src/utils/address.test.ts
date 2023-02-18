import { convertAddressComponentToString } from './address';

describe('convertAddressComponentToString', () => {
  test('should convert an address component object into a string', () => {
    const addressComponent = {
      city: 'Paris',
      houseNumber: '20',
      street: 'Rue de Rivoli',
      country: 'France',
    };
    const result = convertAddressComponentToString(addressComponent);
    expect(result).toEqual('20, Rue de Rivoli, Paris, France');
  });

  test('should ignore null and undefined properties of the address component', () => {
    const addressComponent = {
      city: 'Paris',
      street: undefined,
      country: 'France',
    };
    const result = convertAddressComponentToString(addressComponent);
    expect(result).toEqual('Paris, France');
  });
});
