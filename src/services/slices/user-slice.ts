import { getUserApi, loginUserApi, logoutApi, registerUserApi, updateUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '@utils-cookie';

type TUserState = {
  name: string;
  email: string;
  checked: boolean;
};

const initialState: TUserState = {
  name: '',
  email: '',
  checked: false,
};

export const fetchUser = createAsyncThunk('user/fetch', getUserApi);
export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk('user/login', loginUserApi);
export const logoutUser = createAsyncThunk('user/logout', logoutApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setChecked: (state) => {
      state.checked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        console.error('fetchUser rejected:', action.error?.message);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.error('registerUser rejected:', action.error?.message);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error('loginUser rejected:', action.error?.message);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.email = '';
        state.name = '';
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.error('logoutUser rejected:', action.error?.message);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.error('updateUser rejected:', action.error?.message);
      });
  },
  selectors: {
    selectName: (state) => state.name,
    selectEmail: (state) => state.email,
    selectChecked: (state) => state.checked,
  },
});

export const { selectName, selectEmail, selectChecked } = userSlice.selectors;
export const { setChecked } = userSlice.actions;
export { initialState as UserInitialState };
