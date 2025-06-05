import { fetchUser, setChecked, updateUser, UserInitialState, userSlice } from '@slices';

describe('User slice', () => {
  describe('Synchronous reducer', () => {
    it('should set user check flag', () => {
      const action = setChecked();
      const newState = userSlice.reducer(UserInitialState, action);

      expect(newState.checked).toBe(true);
    });
  });

  describe('Asynchronous reducers', () => {
    it('should handle fulfilled state of getUser (authorization)', () => {
      const mockUser = {
        user: {
          email: 'testEmail',
          name: 'testName',
        },
      };
      const action = { type: fetchUser.fulfilled.type, payload: mockUser };
      const nextState = userSlice.reducer(UserInitialState, action);

      expect(nextState.email).toEqual(mockUser.user.email);
      expect(nextState.name).toEqual(mockUser.user.name);
    });

    it('should handle fulfilled state of updateUser', () => {
      const mockUser = {
        user: {
          email: 'newEmail',
          name: 'newName',
        },
      };
      const action = { type: updateUser.fulfilled.type, payload: mockUser };
      const nextState = userSlice.reducer(UserInitialState, action);

      expect(nextState.email).toEqual(mockUser.user.email);
      expect(nextState.name).toEqual(mockUser.user.name);
    });

    it('should handle rejected state of getUser without changing state', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const action = {
        type: fetchUser.rejected.type,
        error: { message: 'Fetch error' },
      };
      const nextState = userSlice.reducer(UserInitialState, action);

      expect(nextState).toEqual(UserInitialState);
      expect(spy).toHaveBeenCalledWith('fetchUser rejected:', 'Fetch error');

      spy.mockRestore();
    });
  });
});
