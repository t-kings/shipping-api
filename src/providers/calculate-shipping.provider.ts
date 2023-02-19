import type { Response } from 'express';
import type { ShippingCalculatorParams } from '../interfaces';
import { ShippingCalculator } from '../lib';

/**
 * Calculates the shipping cost based on the provided parameters.
 * @param {ShippingCalculatorParams} params The parameters for calculating the shipping cost.
 * @param {Response} res The Express response object.
 * @returns {Promise<void>} A Promise that resolves when the shipping cost has been calculated and sent as a response.
 */
const calculateShipping = async (
  params: ShippingCalculatorParams,
  res: Response
): Promise<void> => {
  try {
    const calculator = new ShippingCalculator(params);

    const shippingCost = await calculator.calculateShipping();

    res.status(200).json({
      message: 'Shipping cost calculated successfully',
      data: {
        shippingCost: shippingCost.toLocaleString('en-US', {
          style: 'decimal',
          useGrouping: true,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        currency: 'USD',
      },
    });
  } catch (error) {
    const message = (error as Error).message;

    res.status(400).json({ message });
  }
};

export const calculateShippingProviders = { calculateShipping };
