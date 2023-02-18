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

/**
 * Shipping calculator class used to calculate the cost of shipping a product.
 */
export class ShippingCalculator {
  /**
   * Quantity of items to be shipped.
   * @readonly
   */
  private readonly quantity: number;

  /**
   * The pickup address of the shipment.
   * @readonly
   */
  private readonly pickupAddress: Address;

  /**
   * The destination address of the shipment.
   * @readonly
   */
  private readonly destinationAddress: Address;

  /**
   * The weight of the shipment in kilograms.
   * @readonly
   */
  private readonly weight: number;

  /**
   * Whether or not the shipment contains vulnerable items.
   * @readonly
   */
  private readonly isVulnerable: boolean;

  /**
   * The cost of the item in the shipment.
   * @readonly
   */
  private readonly costOfItem: number;

  /**
   * The height of the item in the shipment in meters.
   * @readonly
   */
  private readonly height: number;

  /**
   * The width of the item in the shipment in meters.
   * @readonly
   */
  private readonly width: number;

  /**
   * The length of the item in the shipment in meters.
   * @readonly
   */
  private readonly length: number;

  /**
   * The date of the shipment in the format 'YYYY-MM-DD'.
   * @readonly
   */
  private readonly dateOfShipping: string;

  /**
   * ShippingCalculator constructor function
   * @param {Object} options - The options object
   * @param {Object} options.addresses - The pickup and destination addresses
   * @param {string} options.addresses.pickup - The pickup address
   * @param {string} options.addresses.destination - The destination address
   * @param {number} options.weight - The weight of the shipment
   * @param {number} options.quantity - The quantity of items being shipped
   * @param {number} options.costOfItem - The cost of the items being shipped
   * @param {boolean} options.isVulnerable - Indicates whether the items being shipped are vulnerable
   * @param {number} options.length - The length of the shipment
   * @param {number} options.width - The width of the shipment
   * @param {number} options.height - The height of the shipment
   * @param {string} options.dateOfShipping - The date the shipment is to be sent
   */
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

  /**
   * Asynchronously calculates the shipping cost between two addresses.
   *
   * @returns {Promise<number>} A promise that resolves to the total shipping cost.
   *
   * @throws {Error} If the pickup and destination addresses are not in the same city or country, or if the cost of shipping is not supported for the pickup country.
   */
  public readonly calculateShipping = async (): Promise<number> => {
    // Get information about pickup and destination addresses
    const pickupAddressInfo = await getAddressInfo(this.pickupAddress);
    const destinationAddressInfo = await getAddressInfo(
      this.destinationAddress
    );

    // Extract city and country from pickup and destination address
    const { city: pickUpCity, country: pickUpCountry } = getCityAndCountry(
      pickupAddressInfo.address_components
    );
    const { city: destinationCity, country: destinationCountry } =
      getCityAndCountry(destinationAddressInfo.address_components);

    // Check if shipping is between different countries
    if (pickUpCountry !== destinationCountry) {
      throw new Error(
        'We do not calculate shipping between different countries at the moment'
      );
    }

    // Check if the country is supported
    const countryFromEnums = Object.values(Countries).find(
      (country: string) => country.toLowerCase() === pickUpCountry.toLowerCase()
    );
    if (typeof countryFromEnums !== 'string') {
      throw new Error(
        `We do not calculate shipping cost for ${pickUpCountry} at the moment.`
      );
    }

    // Check if shipping is between different cities
    if (pickUpCity !== destinationCity) {
      throw new Error(
        'We do not calculate shipping between different cities at the moment'
      );
    }

    // Get the cost of shipping per meter in the pickup city
    const costOfOneMeter = getCostOfOneMeter(
      pickUpCity.toLowerCase(),
      pickUpCountry.toLowerCase() as Countries,
      this.dateOfShipping
    );

    // Calculate the distance between the pickup and destination addresses
    const distance = await getDistance(
      pickupAddressInfo.geometry.location,
      destinationAddressInfo.geometry.location
    );

    // Calculate the total shipping cost
    return this.calculateShippingInSameCity(distance, costOfOneMeter);
  };

  /**
   * Calculates the shipping cost for a shipment within the same city.
   *
   * @param {number} distance - The distance between the pickup and destination addresses.
   * @param {number} costOfOneMeter - The cost of shipping per meter in the pickup city.
   *
   * @returns {number} The total shipping cost.
   */
  public readonly calculateShippingInSameCity = (
    distance: number,
    costOfOneMeter: number
  ): number => {
    let cost = getDistanceCost(distance, costOfOneMeter);

    // If the weight of the shipment is greater than 0, calculate the weight cost.
    if (this.weight > 0) {
      cost = getWeightCost(this.weight, cost);
    }

    // Calculate the insurance fee based on the vulnerability of the shipment, and add it to the shipping cost.
    cost = getInsuranceFee(this.costOfItem, this.isVulnerable) + cost;

    // Adjust the shipping cost based on the difficulty of shipping the item, and add it to the existing cost.
    cost = getCostImpactOfShippingDifficulty(
      this.width,
      this.length,
      this.height,
      cost
    );

    // Return the total cost of shipping for the given quantity.
    return cost * this.quantity;
  };
}
