import { feedsInitialState, feedsSlice, fetchFeeds } from '@slices';

import { testOrder1, testOrder2 } from './fixtures';

describe('Orders slice', () => {
  describe('Async reducer', () => {
    it('should handle fulfilled state', () => {
      const mockFeeds = {
        orders: [testOrder1, testOrder2],
        total: 10,
        totalToday: 2,
      };
      const action = { type: fetchFeeds.fulfilled.type, payload: mockFeeds };
      const nextState = feedsSlice.reducer(feedsInitialState, action);

      expect(nextState.feeds).toEqual(mockFeeds);
    });

    it('should handle rejected state and not change feeds', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const action = {
        type: fetchFeeds.rejected.type,
        error: { message: 'Error occurred' },
      };
      const nextState = feedsSlice.reducer(feedsInitialState, action);

      expect(nextState.feeds).toEqual(feedsInitialState.feeds);
      expect(spy).toHaveBeenCalledWith('fetchFeeds rejected:', 'Error occurred');

      spy.mockRestore();
    });
  });
});
