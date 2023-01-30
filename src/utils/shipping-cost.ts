import { MAX_ALLOWED_DIMENSION } from '../constants';
import { checkDimensionSlippageForShipping } from './check-number';

export const calculatePercentage = (
  percentage: number,
  baseNumber: number
): number => (percentage / 100) * baseNumber;

export const getDistanceCost = (distance: number, cost: number): number =>
  distance * cost;

export const getWeightCost = (weight: number, cost: number): number => {
  return cost * weight;
};

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

export const getDimensionSpillage = (dimension = 0): number => {
  const dimensionExcesses = dimension - MAX_ALLOWED_DIMENSION;
  if (dimensionExcesses > 0) {
    return checkDimensionSlippageForShipping(dimensionExcesses);
  }
  return 0;
};

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

export const getCostImpactOfShippingDifficulty = (
  width: number,
  length: number,
  height: number,
  totalCost: number
): number => {
  const difficultyInShipping = getDifficultyInCarriage(width, length, height);
  return totalCost + totalCost * difficultyInShipping;
};
