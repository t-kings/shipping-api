import {
  calculatePercentage,
  getCostImpactOfShippingDifficulty,
  getDifficultyInCarriage,
  getDimensionSpillage,
  getDistanceCost,
  getInsuranceFee,
  getWeightCost,
} from './shipping-cost';

describe('calculate percentage', () => {
  test('should calculate percentage of numbers', () => {
    expect(calculatePercentage(10, 1000)).toBe(100);
  });
});

describe('calculate distance cost', () => {
  test('should calculate cost of shipping for full distance', () => {
    expect(getDistanceCost(10, 1000)).toBe(10000);
  });
});

describe('calculate weight cost', () => {
  test('should calculate cost of shipping for full weight', () => {
    expect(getWeightCost(10, 1000)).toBe(10000);
  });
});

describe('calculate insurance fee', () => {
  test('should calculate cost of insurance for shipping for non vulnerable item', () => {
    expect(getInsuranceFee(1000, false)).toBe(10);
  });

  test('should calculate cost of insurance for shipping for  vulnerable item', () => {
    expect(getInsuranceFee(1000, true)).toBe(20);
  });
});

describe('calculate dimension spillage', () => {
  test('should calculate  the excess part of a dimension', () => {
    expect(getDimensionSpillage(0.2)).toBe(0);
    expect(getDimensionSpillage(0.35)).toBe(1);
    expect(getDimensionSpillage(0.4)).toBe(1);
    expect(getDimensionSpillage(0.45)).toBe(1);
    expect(getDimensionSpillage(0.9)).toBe(3);
  });
});

describe('calculate difficulty in carriage', () => {
  test('should calculate  the difficulty in moving a 3d object', () => {
    expect(getDifficultyInCarriage(0.2, 0.3, 0.1)).toBe(0);
    expect(getDifficultyInCarriage(0.2, 0.4, 0.1)).toBe(1);
    expect(getDifficultyInCarriage(0.2, 0.4, 0.9)).toBe(3);
  });

  test('should calculate  the difficulty in moving a 2d object', () => {
    expect(getDifficultyInCarriage(0.2, 0.3)).toBe(0);
    expect(getDifficultyInCarriage(0.2, 0.4)).toBe(1);
    expect(getDifficultyInCarriage(0.6, 0.9)).toBe(6);
  });

  test('should calculate  the difficulty in moving a 1d object', () => {
    expect(getDifficultyInCarriage(0.2)).toBe(0);
    expect(getDifficultyInCarriage(0.4)).toBe(1);
    expect(getDifficultyInCarriage(0.6)).toBe(2);
  });
});

describe('calculate difficulty impact of cost in carriage', () => {
  test('should calculate  the cost of moving objects based on size', () => {
    expect(getCostImpactOfShippingDifficulty(0.2, 0.3, 0.1, 1000)).toBe(1000);
    expect(getCostImpactOfShippingDifficulty(0.2, 0.4, 0.1, 1000)).toBe(2000);
    expect(getCostImpactOfShippingDifficulty(0.2, 0.4, 0.9, 1000)).toBe(4000);
  });
});
