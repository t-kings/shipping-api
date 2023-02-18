import { Countries } from '../enums';
import { cityAndBasePrice } from '../resources';
import {
  getBasePriceOfCity,
  getSeasonsPriceSurge,
  getCostOfOneMeter,
} from './base-cost';

describe('getBasePriceOfCity', () => {
  it('returns base price and fuel surge of a city', () => {
    const result = getBasePriceOfCity(Countries.Nigeria, 'lagos');
    expect(result).toEqual(cityAndBasePrice[Countries.Nigeria]['lagos']);
  });

  it('throws an error if location is not supported', () => {
    expect(() => {
      getBasePriceOfCity(
        'NONEXISTENT_COUNTRY' as Countries,
        'NONEXISTENT_CITY'
      );
    }).toThrow('Location not supported yet');
  });
});

describe('getSeasonsPriceSurge', () => {
  it('returns the price surge based on the current season if no date provided', () => {
    const result = getSeasonsPriceSurge();
    expect(result).toEqual(1.2);
  });

  it('returns the price surge based on the season of a given date', () => {
    const result = getSeasonsPriceSurge('2023-07-15');
    expect(result).toEqual(1);
  });

  it('throws an error if an invalid date is provided', () => {
    expect(() => {
      getSeasonsPriceSurge('INVALID_DATE');
    }).toThrow('Invalid date provided');
  });
});

describe('getCostOfOneMeter', () => {
  it('returns the cost of one meter of shipping', () => {
    const result = getCostOfOneMeter('lagos', Countries.Nigeria, '2023-07-15');
    expect(result).toEqual(0.03);
  });

  it('throws an error if the location is not supported', () => {
    expect(() => {
      getCostOfOneMeter(
        'NONEXISTENT_CITY',
        'NONEXISTENT_COUNTRY' as Countries,
        '2023-07-15'
      );
    }).toThrow('Location not supported yet');
  });

  it('throws an error if an invalid date is provided', () => {
    expect(() => {
      getCostOfOneMeter('lagos', Countries.Nigeria, 'INVALID_DATE');
    }).toThrow('Invalid date provided');
  });
});
