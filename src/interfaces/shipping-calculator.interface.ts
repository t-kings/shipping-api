/**
 * Parameters for calculating shipping costs.
 * @typedef {Object} ShippingCalculatorParams
 * @property {number|null} weight - The weight of the item to be shipped.
 * @property {number|null} quantity - The number of items to be shipped.
 * @property {number|null} costOfItem - The cost of the item(s) to be shipped.
 * @property {boolean|null} isVulnerable - Whether the item(s) are vulnerable or not.
 * @property {number|null} length - The length of the item to be shipped.
 * @property {number|null} width - The width of the item to be shipped.
 * @property {number|null} height - The height of the item to be shipped.
 * @property {Addresses} addresses - The pickup and destination addresses.
 * @property {string|null} dateOfShipping - The date the item(s) will be shipped.
 */
export interface ShippingCalculatorParams {
  weight?: number | null;
  quantity?: number | null;
  costOfItem?: number | null;
  isVulnerable?: boolean | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;
  addresses: Addresses;
  dateOfShipping?: string | null;
}

/**
 * Object containing pickup and destination addresses.
 * @typedef {Object} Addresses
 * @property {Address} pickup - The pickup address.
 * @property {Address} destination - The destination address.
 */
export interface Addresses {
  pickup: Address;
  destination: Address;
}

/**
 * An address component that can be used to construct an address.
 * @typedef {Object} AddressComponent
 * @property {string} country - The country of the address.
 * @property {string|undefined} [street] - The street of the address, if available.
 * @property {string|undefined} [city] - The city of the address, if available.
 * @property {string|number|undefined} [houseNumber] - The house number of the address, if available.
 */
export interface AddressComponent {
  country: string;
  street?: string;
  city?: string;
  houseNumber?: string | number;
}

/**
 * An address can be a string or an address component.
 * @typedef {string|AddressComponent} Address
 */
export type Address = AddressComponent | string;
