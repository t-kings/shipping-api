/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { calculateShippingController } from '../controllers';

/**
 * Express router for calculating shipping.
 * @type {import('express').Router}
 */
const router = Router();

/**
 * POST /calculate-shipping
 * Route for calculating shipping.
 * @name Calculate Shipping
 * @path {POST} /calculate-shipping
 * @bodyparam {Object} addresses Object containing pickup and destination addresses.
 * @bodyparam {string} addresses.pickup The pickup address.
 * @bodyparam {string} addresses.destination The destination address.
 * @bodyparam {number} weight The weight of the package in kg.
 * @bodyparam {number} quantity The quantity of items being shipped.
 * @bodyparam {number} costOfItem The cost of a single item.
 * @bodyparam {boolean} isVulnerable Whether the package is vulnerable or not.
 * @bodyparam {number} length The length of the package in cm.
 * @bodyparam {number} width The width of the package in cm.
 * @bodyparam {number} height The height of the package in cm.
 * @bodyparam {string} dateOfShipping The date the package is being shipped.
 * @response {string} message A success message.
 * @response {Object} data Object containing the shipping cost.
 * @response {number} data.shippingCost The shipping cost.
 */
router.post('/', calculateShippingController.calculateShipping);

export const calculateShippingRouter = router;
