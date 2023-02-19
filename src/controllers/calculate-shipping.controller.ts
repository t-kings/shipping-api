import type { Request, Response } from 'express';
import { responses } from '../constants';
import { calculateShippingProviders } from '../providers';
import { getCalculateShippingPayloadValidationErrors } from '../validation';

/**
 * Controller function for calculating shipping.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
const calculateShipping = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validationErrors = getCalculateShippingPayloadValidationErrors(
      req.body
    );
    if (validationErrors !== null) {
      res
        .status(400)
        .json({ message: responses.validationError, errors: validationErrors });
    }
    await calculateShippingProviders.calculateShipping(req.body, res);
  } catch (error) {
    res.status(500).json({ message: responses.internalServerError });
  }
};

export const calculateShippingController = {
  calculateShipping,
};
