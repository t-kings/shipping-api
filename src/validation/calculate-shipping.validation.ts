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
      weight: number()
        .required('Please provide the weight of the shipment')
        .typeError('Weight must be a number'),
      quantity: number()
        .required('Please provide the quantity of items')
        .typeError('Quantity must be a number'),
      costOfItem: number()
        .required('Please provide the cost of each item')
        .typeError('Cost of item must be a number'),
      isVulnerable: boolean()
        .required('Please specify if the item is vulnerable or not')
        .typeError('Is vulnerable must be a boolean'),
      length: number()
        .required('Please provide the length of the shipment')
        .typeError('Length must be a number'),
      width: number()
        .required('Please provide the width of the shipment')
        .typeError('Width must be a number'),
      height: number()
        .required('Please provide the height of the shipment')
        .typeError('Height must be a number'),
      dateOfShipping: string().required('Please provide the date of shipping'),
    });

    // Validate the request body against the schema
    schema.validateSync(params, { abortEarly: false });

    return null;
  } catch (error) {
    const err = error as ValidationError;
    return err.errors;
  }
};
