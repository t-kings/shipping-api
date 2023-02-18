import { MAX_ALLOWED_DIMENSION } from '../constants';
import { checkDimensionSlippageForShipping } from './check-number';

/**
 * Calculates percentage of baseNumber
 * @param {number} percentage - The percentage to calculate
 * @param {number} baseNumber - The number to calculate percentage from
 * @returns {number} The calculated percentage
 */
export const calculatePercentage = (
  percentage: number,
  baseNumber: number
): number => (percentage / 100) * baseNumber;

/**
 * Calculates the cost of distance
 * @param {number} distance - The distance of the shipment
 * @param {number} cost - The cost of one meter of shipping
 * @returns {number} The cost of distance
 */
export const getDistanceCost = (distance: number, cost: number): number =>
  distance * cost;

/**
 * Calculates the cost of weight
 * @param {number} weight - The weight of the shipment
 * @param {number} cost - The cost of one kilogram of shipping
 * @returns {number} The cost of weight
 */
export const getWeightCost = (weight: number, cost: number): number => {
  return cost * weight;
};

/**
 * Calculates the insurance fee for a shipment
 * @param {number} costOfItem - The cost of the item being shipped
 * @param {boolean} isVulnerable - Whether or not the item is vulnerable
 * @returns {number} The insurance fee
 */
export const getInsuranceFee = (
  costOfItem: number,
  isVulnerable: boolean
): number => {
  /**
   * * Using 1% of the cost as the insurance fee from cost of item
   */
  const insuranceFeeFromCostOfItem = calculatePercentage(1, costOfItem);

  /**
   * * Using 1% of the cost as the insurance fee from vulnerability of item
   */
  const insuranceFeeFromVulnerability = isVulnerable
    ? calculatePercentage(1, costOfItem)
    : 0;

  return insuranceFeeFromVulnerability + insuranceFeeFromCostOfItem;
};

/**
 * Calculates the slippage of a dimension for shipping
 * @param {number} dimension - The dimension of the shipment
 * @returns {number} The dimension slippage
 */
export const getDimensionSpillage = (dimension = 0): number => {
  const dimensionExcesses = dimension - MAX_ALLOWED_DIMENSION;
  if (dimensionExcesses > 0) {
    return checkDimensionSlippageForShipping(dimensionExcesses);
  }
  return 0;
};

/**
 * Calculates the difficulty in carriage for a shipment
 * @param {number} width - The width of the shipment
 * @param {number} length - The length of the shipment
 * @param {number} height - The height of the shipment
 * @returns {number} The difficulty in carriage
 */
export const getDifficultyInCarriage = (
  width?: number,
  length?: number,
  height?: number
): number => {
  const lengthSpillage = getDimensionSpillage(length);
  const widthSpillage = getDimensionSpillage(width);
  const heightSpillage = getDimensionSpillage(height);

  const spillages = [lengthSpillage, widthSpillage, heightSpillage].filter(
    (spillage) => spillage > 0
  );

  if (spillages.length === 0) {
    return 0;
  }

  return spillages.reduce((previous, current) => {
    return previous * current;
  }, 1);
};

/**
 * Calculates the impact of shipping difficulty on the total shipping cost.
 * @param {number} width - The width of the item to be shipped.
 * @param {number} length - The length of the item to be shipped.
 * @param {number} height - The height of the item to be shipped.
 * @param {number} totalCost - The total cost of shipping.
 * @returns {number} The total cost of shipping with the difficulty impact factored in.
 */
export const getCostImpactOfShippingDifficulty = (
  width: number,
  length: number,
  height: number,
  totalCost: number
): number => {
  const difficultyInShipping = getDifficultyInCarriage(width, length, height);
  return totalCost + totalCost * difficultyInShipping;
};
