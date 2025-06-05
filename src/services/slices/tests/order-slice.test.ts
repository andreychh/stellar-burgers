import { fetchOrders, ordersInitialState, ordersSlice } from '@slices';

import { testOrder1, testOrder2 } from './fixtures';

describe('User orders slice', () => {
  describe('Async reducer', () => {
    it('should handle pending state', () => {
      const action = { type: fetchOrders.pending.type };
      const nextState = ordersSlice.reducer(ordersInitialState, action);

      expect(nextState.loaded).toBe(true);
      expect(nextState.orders).toHaveLength(0);
    });

    it('should handle fulfilled state', () => {
      const mockOrders = [testOrder1, testOrder2];
      const action = {
        type: fetchOrders.fulfilled.type,
        payload: mockOrders,
      };
      const nextState = ordersSlice.reducer(ordersInitialState, action);

      expect(nextState.loaded).toBe(false);
      expect(nextState.orders).toEqual(mockOrders);
    });

    it('should handle rejected state', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const action = {
        type: fetchOrders.rejected.type,
        error: { message: 'Error occurred' },
      };
      const nextState = ordersSlice.reducer(ordersInitialState, action);

      expect(nextState.loaded).toBe(false);
      expect(nextState.orders).toHaveLength(0);
      expect(spy).toHaveBeenCalledWith('fetchOrders rejected:', 'Error occurred');

      spy.mockRestore();
    });
  });
});
