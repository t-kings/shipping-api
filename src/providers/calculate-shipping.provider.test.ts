import { calculateShippingProviders } from './calculate-shipping.provider';
import { ShippingCalculatorParams } from '../interfaces';
import { ShippingCalculator } from '../lib';
import { Response } from 'express';

jest.mock('../lib');

describe('calculateShippingProviders', () => {
  const mockShippingCalculator = ShippingCalculator as jest.MockedClass<
    typeof ShippingCalculator
  >;

  beforeEach(() => {
    mockShippingCalculator.mockClear();
  });

  it('should calculate the shipping cost and return a response with a 200 status code', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockShippingCost = 42;
    const mockShippingCalculatorInstance = {
      calculateShipping: jest.fn().mockResolvedValue(mockShippingCost),
    } as unknown as ShippingCalculator;

    mockShippingCalculator.mockImplementation(
      () => mockShippingCalculatorInstance
    );

    const mockShippingParams = {
      addresses: {
        pickup: '123 Main St',
        destination: '456 Maple Ave',
      },
      weight: 10,
      quantity: 1,
      costOfItem: 100,
      isVulnerable: true,
      length: 12,
      width: 8,
      height: 10,
      dateOfShipping: '2022-02-18',
    };

    await calculateShippingProviders.calculateShipping(
      mockShippingParams,
      mockResponse
    );

    expect(mockShippingCalculator).toHaveBeenCalledWith(mockShippingParams);
    expect(mockShippingCalculatorInstance.calculateShipping).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Shipping cost calculated successfully',
      data: {
        shippingCost: mockShippingCost,
      },
    });
  });
});
