import { ShippingCalculator } from './ShippingCalculator.lib';

describe('ShippingCalculator', () => {
  const params = {
    addresses: {
      pickup: 'ikoyi, lagos',
      destination: 'ikeja, lagos',
    },
    weight: 2,
    quantity: 3,
    costOfItem: 10,
    isVulnerable: true,
    length: 1,
    width: 1,
    height: 1,
    dateOfShipping: '2023-02-20',
  };

  it('should calculate the shipping cost', async () => {
    const shippingCalculator = new ShippingCalculator(params);
    const shippingCost = await shippingCalculator.calculateShipping();
    expect(shippingCost).toBeGreaterThan(0);
  });

  it('should throw an error if the pickup and destination addresses are in different countries', async () => {
    const invalidParams = {
      ...params,
      addresses: {
        pickup: '123 Main St, Anytown USA',
        destination: '789 Rue de la Rue, Paris, France',
      },
    };
    const shippingCalculator = new ShippingCalculator(invalidParams);
    await expect(shippingCalculator.calculateShipping()).rejects.toThrow(
      'We do not calculate shipping between different countries at the moment'
    );
  });

  it('should throw an error if the pickup country is not supported', async () => {
    const invalidParams = {
      ...params,
      addresses: {
        pickup: '123 Main St, Tokyo, Japan',
        destination: '12 Main St, Tokyo, Japan',
      },
    };
    const shippingCalculator = new ShippingCalculator(invalidParams);
    await expect(shippingCalculator.calculateShipping()).rejects.toThrow(
      'We do not calculate shipping cost for Japan at the moment.'
    );
  });

  it('should throw an error if the pickup and destination addresses are in different cities', async () => {
    const invalidParams = {
      ...params,
      addresses: {
        pickup: 'lagos, nigeria',
        destination: 'enugu, nigeria',
      },
    };
    const shippingCalculator = new ShippingCalculator(invalidParams);
    await expect(shippingCalculator.calculateShipping()).rejects.toThrow(
      'We do not calculate shipping between different cities at the moment'
    );
  });
});
