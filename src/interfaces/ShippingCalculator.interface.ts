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

export interface Addresses {
  pickup: Address;
  destination: Address;
}

export interface AddressComponent {
  country: string;
  street?: string;
  city?: string;
  houseNumber?: string | number;
}

export type Address = AddressComponent | string;
