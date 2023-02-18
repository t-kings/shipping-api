import { Address, type ShippingCalculatorParams } from '../interfaces';
import { getAddressInfo } from '../services';
import {
  getCostImpactOfShippingDifficulty,
  getDistanceCost,
  getInsuranceFee,
  getWeightCost,
} from '../utils';
import { getCostOfOneMeter } from '../utils/base-cost';

export class ShippingCalculator {
  private readonly quantity: number;
  private readonly pickupAddress: Address;
  private readonly destinationAddress: Address;
  private readonly weight: number;
  private readonly isVulnerable: boolean;
  private readonly costOfItem: number;
  private readonly height: number;
  private readonly width: number;
  private readonly length: number;
  private readonly dateOfShipping: string;

  constructor({
    addresses: { pickup, destination },
    weight,
    quantity,
    costOfItem,
    isVulnerable,
    length,
    width,
    height,
    dateOfShipping,
  }: ShippingCalculatorParams) {
    this.weight = Number(weight);
    this.pickupAddress = pickup;
    this.destinationAddress = destination;
    this.quantity = Number(quantity);
    this.isVulnerable = Boolean(isVulnerable);
    this.costOfItem = Number(costOfItem);
    this.length = Number(length);
    this.width = Number(width);
    this.height = Number(height);
    this.dateOfShipping = String(dateOfShipping);
  }

  public readonly calculateShipping = async (): Promise<number> => {
    const pickupAddressInfo = await getAddressInfo(this.pickupAddress);
    const destinationAddressInfo = await getAddressInfo(
      this.destinationAddress
    );
    const city = pickupAddressInfo.geometry.
    const country = '';
    const costOfOneMeter = getCostOfOneMeter(
      city,
      country,
      this.dateOfShipping
    );

    const distance = getDistance();
    return this.calculateShippingInSameCity(distance, costOfOneMeter);
  };

  public readonly calculateShippingInSameCity = (
    distance: number,
    costOfOneMeter: number
  ): number => {
    let cost = getDistanceCost(distance, costOfOneMeter);
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
