import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type IngredientsState = {
  constructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  ordering: boolean;
  order: TOrder | null;
};

const initialState: IngredientsState = {
  constructor: {
    bun: null,
    ingredients: [],
  },
  ordering: false,
  order: null,
};

export const orderBurger = createAsyncThunk('constructor/construct', orderBurgerApi);

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructor.bun = action.payload;
        } else {
          state.constructor.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      },
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructor.ingredients = state.constructor.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const { ingredients } = state.constructor;

      if (index <= 0 || index >= ingredients.length) return;

      [ingredients[index], ingredients[index - 1]] = [ingredients[index - 1], ingredients[index]];
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const { ingredients } = state.constructor;

      if (index < 0 || index >= ingredients.length - 1) return;

      [ingredients[index], ingredients[index + 1]] = [ingredients[index + 1], ingredients[index]];
    },
    clearConstructor: (state) => {
      state.order = null;
      state.constructor.bun = null;
      state.constructor.ingredients = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.ordering = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.ordering = false;
        state.order = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.ordering = false;
      });
  },
  selectors: {
    selectConstructor: (state) => state.constructor,
    selectOrdering: (state) => state.ordering,
    selectOrder: (state) => state.order,
  },
});

export const { addIngredient, removeIngredient, moveUp, moveDown, clearConstructor } = constructorSlice.actions;
export const { selectConstructor, selectOrdering, selectOrder } = constructorSlice.selectors;
export { initialState as constructorInitialState };
