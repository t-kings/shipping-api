import { PlaceType2 } from '@googlemaps/google-maps-services-js';
import {
  getAddressInfo,
  getCityAndCountry,
  getDistance,
  googleClient,
} from './google';

describe('test google', () => {
  describe('getAddressInfo', () => {
    it('returns the geocode result for a valid address', async () => {
      const result = await getAddressInfo(
        '1600 Amphitheatre Parkway, Mountain View, CA'
      );
      expect(result).toBeDefined();
      expect(result.geometry.location.lat).toBeCloseTo(37.422, 1);
      expect(result.geometry.location.lng).toBeCloseTo(-122.084, 1);
    });

    it('throws an error for an invalid address', async () => {
      await expect(getAddressInfo('invalid address')).rejects.toThrow(
        'Cannot find this location'
      );
    });
  });

  describe('getCityAndCountry', () => {
    it('should extract city and country from geocode result', () => {
      const addressComponents = [
        {
          long_name: 'Lagos',
          types: [PlaceType2.administrative_area_level_1],
          short_name: '',
        },
        {
          long_name: 'Nigeria',
          types: [PlaceType2.country],
          short_name: '',
        },
      ];

      const result = getCityAndCountry(addressComponents);

      expect(result).toEqual({ city: 'Lagos', country: 'Nigeria' });
    });

    it('should throw error if city cannot be found in geocode result', () => {
      const addressComponents = [
        {
          long_name: 'United States',
          types: [PlaceType2.country],
          short_name: '',
        },
      ];

      expect(() => getCityAndCountry(addressComponents)).toThrow(
        'City cannot be gotten from this address'
      );
    });

    it('should throw error if country cannot be found in geocode result', () => {
      const addressComponents = [
        {
          long_name: 'Lagos',
          types: [PlaceType2.administrative_area_level_1],
          short_name: '',
        },
      ];

      expect(() => getCityAndCountry(addressComponents)).toThrow(
        'Country cannot be gotten from this address'
      );
    });
  });

  describe('getDistance', () => {
    it('should return the driving distance between two locations', async () => {
      const origin = { lat: 47.6062, lng: -122.3321 };
      const destination = { lat: 37.7749, lng: -122.4194 };

      const result = await getDistance(origin, destination);

      expect(result).toBeGreaterThan(0);
    });

    it('should throw error if an error occurs while getting the distance', async () => {
      const origin = { lat: 47.6062, lng: -122.3321 };
      const destination = { lat: 37.7749, lng: -122.4194 };

      jest.spyOn(googleClient, 'directions').mockImplementation(() => {
        throw new Error('Test error');
      });

      await expect(getDistance(origin, destination)).rejects.toThrow(
        'An internal error occurred'
      );
    });
  });
});
