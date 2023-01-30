import {
  getInsuranceFee,
  getWeightCost,
  getDistanceCost,
  getCostImpactOfShippingDifficulty,
} from '../utils';
import { ShippingCalculator } from './ShippingCalculator.lib';

jest.mock('../utils', () => {
  const original = jest.requireActual('../utils');
  return {
    ...original,
    getDistanceCost: jest.fn().mockReturnValue(500),
    getWeightCost: jest.fn().mockReturnValue(500),
    getInsuranceFee: jest.fn().mockReturnValue(500),
    getCostImpactOfShippingDifficulty: jest.fn().mockReturnValue(500),
  };
});

describe('ShippingCalculator', () => {
  const params = {
    costOfOneMeter: 10,
    distanceInMeter: 1000,
    weight: 0,
    quantity: 10,
    costOfItem: 10000,
    isVulnerable: false,
    length: 0.1,
    width: 0.2,
    height: 0.1,
  };

  test('should calculate shipping fee without weight', () => {
    const shippingCalculator = new ShippingCalculator(params);
    shippingCalculator.calculateShipping();
    expect(getWeightCost).toHaveBeenCalledTimes(0);
  });

  test('should calculate shipping fee with weight', () => {
    const shippingCalculator = new ShippingCalculator({
      ...params,
      weight: 100,
    });
    shippingCalculator.calculateShipping();
    expect(getWeightCost).toHaveBeenCalledTimes(1);
    expect(getWeightCost).toHaveBeenCalledWith(100, 500);
  });

  test('should calculate shipping fee', () => {
    const shippingCalculator = new ShippingCalculator({
      ...params,
    });
    const res = shippingCalculator.calculateShipping();
    expect(getDistanceCost).toHaveBeenLastCalledWith(
      params.distanceInMeter,
      params.costOfOneMeter
    );
    expect(getInsuranceFee).toHaveBeenLastCalledWith(
      params.costOfItem,
      params.isVulnerable
    );
    expect(getCostImpactOfShippingDifficulty).toHaveBeenLastCalledWith(
      params.width,
      params.length,
      params.height,
      1000
    );
    expect(res).toBe(5000);
  });
});
