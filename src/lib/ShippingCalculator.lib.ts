import {
  MAX_ALLOWED_AREA,
  MAX_ALLOWED_DIMENSION,
  MAX_ALLOWED_VOLUME,
} from '../constants';
import { type ShippingCalculatorParams } from '../interfaces';
import {
  calculatePercentage,
  checkAreaSlippageForShipping,
  checkDimensionSlippageForShipping,
  checkVolumeSlippageForShipping,
  isNumberPositivelyValid,
} from '../utils';

export class ShippingCalculator {
  private readonly costOfOneMeter: number;
  private readonly quantity: number;
  private readonly distanceInMeter: number;
  private readonly weight: number;
  private distanceCost: number | undefined;
  public weightCost: number | undefined;
  public insuranceFee = 0;
  public difficultyInShipping = 0;

  constructor({
    costOfOneMeter,
    distanceInMeter,
    weight,
    quantity,
    costOfItem,
    isVulnerable,
    length,
    width,
    height,
  }: ShippingCalculatorParams) {
    this.costOfOneMeter = this.getCostOfOneMeter(Number(costOfOneMeter)); // * Influenced by location
    this.distanceInMeter = Number(distanceInMeter);
    this.weight = Number(weight);
    this.quantity = Number(quantity);
    this.setInsuranceFee(Number(costOfItem), Boolean(isVulnerable));
    this.setDifficultyInCarriage(Number(length), Number(width), Number(height));
  }

  public readonly calculateShipping = (): void => {
    //
  };

  private readonly calculateDistanceCost = (): number => {
    this.distanceCost = this.distanceInMeter * this.costOfOneMeter;
    return this.distanceCost;
  };

  private readonly calculateWeighCost = (): number => {
    if (
      this.distanceCost === null ||
      this.distanceCost === undefined ||
      isNaN(this.distanceCost)
    ) {
      throw new Error(
        'Cost of moving the item through the distance should be determined first'
      );
    }
    this.weightCost = this.distanceCost * this.weight;
    return this.weightCost;
  };

  private readonly getCostOfOneMeter = (costOfOneMeter: number): number => {
    /**
     * TODO: Get events in that city by that time and estimate the significant increase in price
     * TODO: Get the number of requests in that city by that time and estimate the significant increase in price
     * TODO: Get the season (christmas, new year celebrations, new year) of requests in that city by that time and estimate the significant increase in price
     * TODO: Get location and also shipping service and estimate the significant increase in price
     *
     */
    return costOfOneMeter;
  };

  private readonly setInsuranceFee = (
    costOfItem: number,
    isVulnerable: boolean
  ): void => {
    const totalCostOfItems = costOfItem * this.quantity;
    /**
     * * Using 1% of the cost as the insurance fee from cost of item
     */
    const insuranceFeeFromCostOfItem = calculatePercentage(1, totalCostOfItems);

    /**
     * * Using 1% of the cost as the insurance fee from vulnerability of item
     */
    const insuranceFeeFromVulnerability = isVulnerable
      ? calculatePercentage(1, totalCostOfItems)
      : 0;

    this.insuranceFee =
      insuranceFeeFromVulnerability + insuranceFeeFromCostOfItem;
  };

  private readonly setDifficultyInCarriage = (
    length: number,
    width: number,
    height: number
  ): void => {
    const isLengthValid = isNumberPositivelyValid(length);
    const isWidthValid = isNumberPositivelyValid(length);
    const isHeightValid = isNumberPositivelyValid(length);

    if (isLengthValid && isWidthValid && isHeightValid) {
      const volume = length * width * height;
      const volumeExcesses = volume - MAX_ALLOWED_VOLUME;
      if (volumeExcesses > 0) {
        this.difficultyInShipping =
          checkVolumeSlippageForShipping(volumeExcesses);
      }
    } else {
      let area = 0;

      if (isLengthValid && isWidthValid) {
        area = length * width;
      } else if (isLengthValid && isHeightValid) {
        area = length * height;
      } else if (isWidthValid && isHeightValid) {
        area = width * height;
      }

      if (area > 0) {
        const areaExcesses = area - MAX_ALLOWED_AREA;
        if (areaExcesses > 0) {
          this.difficultyInShipping =
            checkAreaSlippageForShipping(areaExcesses);
        }
      } else {
        let dimension = 0;

        if (isLengthValid) {
          dimension = length;
        } else if (isHeightValid) {
          dimension = height;
        } else if (isWidthValid) {
          dimension = width;
        }
        const dimensionExcesses = dimension - MAX_ALLOWED_DIMENSION;
        if (dimensionExcesses > 0) {
          this.difficultyInShipping =
            checkDimensionSlippageForShipping(dimensionExcesses);
        }
      }
    }
    this.difficultyInShipping = 0;
  };

  private readonly getCostImpactOfShippingDifficulty = (
    totalCost: number
  ): number => {
    if (this.difficultyInShipping > 0) {
      return totalCost * this.difficultyInShipping;
    }
    return totalCost;
  };
}
