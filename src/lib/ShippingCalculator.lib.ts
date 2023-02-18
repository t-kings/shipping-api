import { type ShippingCalculatorParams } from '../interfaces';
import {
  getCostImpactOfShippingDifficulty,
  getDistanceCost,
  getInsuranceFee,
  getWeightCost,
} from '../utils';

export class ShippingCalculator {
  private readonly costOfOneMeter: number;
  private readonly quantity: number;
  private readonly distanceInMeter: number;
  private readonly weight: number;
  private readonly isVulnerable: boolean;
  private readonly costOfItem: number;
  private readonly height: number;
  private readonly width: number;
  private readonly length: number;

  constructor({
    addresses: { destination, pickup },
    weight,
    quantity,
    costOfItem,
    isVulnerable,
    length,
    width,
    height,
  }: ShippingCalculatorParams) {
    this.costOfOneMeter = Number(costOfOneMeter);
    this.distanceInMeter = Number(distanceInMeter);
    this.weight = Number(weight);
    this.quantity = Number(quantity);
    this.isVulnerable = Boolean(isVulnerable);
    this.costOfItem = Number(costOfItem);
    this.length = Number(length);
    this.width = Number(width);
    this.height = Number(height);
  }

  public readonly calculateShipping = (): number => {
    let cost = getDistanceCost(this.distanceInMeter, this.costOfOneMeter);
    if (this.weight > 0) {
      cost = getWeightCost(this.weight, cost);
    }

    cost = getInsuranceFee(this.costOfItem, this.isVulnerable) + cost;
    cost = getCostImpactOfShippingDifficulty(
      this.width,
      this.length,
      this.height,
      cost
    );

    return cost * this.quantity;
  };
}
