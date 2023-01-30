export interface ShippingCalculatorParams {
  costOfOneMeter: number;
  distanceInMeter: number;
  weight: number;
  quantity: number;
  costOfItem: number;
  isVulnerable?: boolean;
  length?: number;
  width?: number;
  height?: number;
}
