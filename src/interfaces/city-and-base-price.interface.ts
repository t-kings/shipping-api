/**
 * An interface representing city base price values.
 * @interface
 */
export interface CityAndBasePriceValue {
  /**
   * The base price for the city.
   * @type {number}
   */
  basePrice: number;

  /**
   * The fuel surge for the city.
   * @type {number}
   */
  fuelSurge: number;
}
