import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orders: TOrder[];
  loaded: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  loaded: false,
};

export const fetchOrders = createAsyncThunk('orders/fetch', getOrdersApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loaded = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loaded = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loaded = false;
        console.error('fetchOrders rejected:', action.error?.message);
      });
  },
  selectors: {
    selectLoaded: (state) => state.loaded,
    selectOrders: (state) => state.orders,
  },
});

export const { selectLoaded, selectOrders } = ordersSlice.selectors;
export { initialState as ordersInitialState };
