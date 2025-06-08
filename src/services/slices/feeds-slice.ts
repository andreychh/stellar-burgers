import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type IngredientsState = {
  feeds: TOrdersData;
};

const initialState: IngredientsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const fetchFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload;
      })
      .addCase(fetchFeeds.rejected, (_state, action) => {
        console.error('fetchFeeds rejected:', action.error?.message);
      });
  },
  selectors: {
    _selectOrders: (state) => state.feeds.orders,
    selectTotal: (state) => state.feeds.total,
    selectTotalToday: (state) => state.feeds.totalToday,
  },
});

export const { _selectOrders, selectTotal, selectTotalToday } = feedsSlice.selectors;
export { initialState as feedsInitialState };
