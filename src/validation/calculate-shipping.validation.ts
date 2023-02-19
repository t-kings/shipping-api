import { object, string, number, boolean, type ValidationError } from 'yup';
import type { ShippingCalculatorParams } from '../interfaces';

/**
 * Validates a `ShippingCalculatorParams` object against a schema using `yup`.
 * @param {ShippingCalculatorParams} params - The `ShippingCalculatorParams` object to validate.
 * @returns {string[] | null} An array of error messages, or `null` if there are no errors.
 */
export const getCalculateShippingPayloadValidationErrors = (
  params: ShippingCalculatorParams
): string[] | null => {
  try {
    const schema = object({
      addresses: object({
        pickup: string().required('Please provide a pickup address'),
        destination: string().required('Please provide a destination address'),
      }),
      weight: number().required('Please provide the weight of the shipment'),
      quantity: number().required('Please provide the quantity of items'),
      costOfItem: number().required('Please provide the cost of each item'),
      isVulnerable: boolean().required(
        'Please specify if the item is vulnerable or not'
      ),
      length: number().required('Please provide the length of the shipment'),
      width: number().required('Please provide the width of the shipment'),
      height: number().required('Please provide the height of the shipment'),
      dateOfShipping: string().required('Please provide the date of shipping'),
    });

    // Validate the request body against the schema
    schema.validateSync(params);

    return null;
  } catch (error) {
    const err = error as ValidationError;
    return err.errors;
  }
};
