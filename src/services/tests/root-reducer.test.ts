import store, { rootReducer } from '@store';

describe('Root reducer', () => {
  it('should not mutate state when called with an unknown action', () => {
    const initialState = store.getState();

    const unknownAction = { type: 'UNKNOWN_ACTION_TEST' };

    const nextState = rootReducer(initialState, unknownAction);

    expect(nextState).toEqual(initialState);

    Object.keys(initialState).forEach((key) => {
      const typedKey = key as keyof typeof initialState;
      expect(nextState[typedKey]).toBe(initialState[typedKey]);
    });
  });
});
