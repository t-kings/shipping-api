import { getCalculateShippingPayloadValidationErrors } from './calculate-shipping.validation';
import { ShippingCalculatorParams } from '../interfaces';

describe('getCalculateShippingPayloadValidationErrors', () => {
  let validParams: ShippingCalculatorParams;

  beforeEach(() => {
    validParams = {
      addresses: {
        pickup: '123 Main St',
        destination: '456 Elm St',
      },
      weight: 10,
      quantity: 2,
      costOfItem: 20,
      isVulnerable: false,
      length: 10,
      width: 10,
      height: 10,
      dateOfShipping: '2023-02-20',
    };
  });

  it('returns null for valid params', () => {
    const result = getCalculateShippingPayloadValidationErrors(validParams);
    expect(result).toBeNull();
  });

  it('returns an array of error messages for invalid params', () => {
    const invalidParams: ShippingCalculatorParams = {
      addresses: {
        pickup: '',
        destination: '',
      },
      weight: '10', // should be a number
      quantity: '2', // should be a number
      costOfItem: '20', // should be a number
      isVulnerable: 'no', // should be a boolean
      length: '10', // should be a number
      width: '10', // should be a number
      height: '10', // should be a number
      dateOfShipping: '', // required
    } as unknown as ShippingCalculatorParams;

    const result = getCalculateShippingPayloadValidationErrors(invalidParams);
    expect(result?.length).toBeGreaterThan(0);
  });
});
