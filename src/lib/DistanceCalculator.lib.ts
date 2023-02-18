import { Countries } from '../enums';
import type { Address, ShippingCalculatorParams } from '../interfaces';
import { getAddressInfo, getCityAndCountry, getDistance } from '../services';
import {
  getCostImpactOfShippingDifficulty,
  getDistanceCost,
  getInsuranceFee,
  getWeightCost,
} from '../utils';
import { getCostOfOneMeter } from '../utils/base-cost';

export class DistanceCalculator {
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
    const { city: pickUpCity, country: pickUpCountry } =
      getCityAndCountry(pickupAddressInfo);
    const { city: destinationCity, country: destinationCountry } =
      getCityAndCountry(destinationAddressInfo);

    if (pickUpCountry !== destinationCountry) {
      throw new Error(
        'We do not calculate shipping between different countries at the moment'
      );
    }
    const countryFromEnums = Object.values(Countries).find(
      (country: string) => country.toLowerCase() === pickUpCountry.toLowerCase()
    );
    if (typeof countryFromEnums !== 'string') {
      throw new Error(
        `We do not calculate shipping cost for ${pickUpCountry} at the moment.`
      );
    }

    if (pickUpCity !== destinationCity) {
      throw new Error(
        'We do not calculate shipping between different cities at the moment'
      );
    }

    const costOfOneMeter = getCostOfOneMeter(
      pickUpCity,
      pickUpCountry as Countries,
      this.dateOfShipping
    );

    const distance = await getDistance(
      pickupAddressInfo.geometry.location,
      destinationAddressInfo.geometry.location
    );
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
