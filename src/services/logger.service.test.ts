import { customLog } from './logger.service';

describe('customLog', () => {
  describe('error', () => {
    it('should log an error message to the console', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const errorMessage = 'This is an error message';
      customLog.error(errorMessage);

      expect(consoleSpy).toHaveBeenCalledWith(errorMessage);

      consoleSpy.mockRestore();
    });
  });
});
