import {
  addIngredient,
  clearConstructor,
  constructorInitialState,
  constructorSlice,
  moveDown,
  moveUp,
  removeIngredient,
} from '@slices';
import { TConstructorIngredient, TOrder } from '@utils-types';

const testBun: TConstructorIngredient = {
  _id: 'bun1',
  name: 'Test Bun',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: '',
  id: 'bun-test-id',
};

const testIngredient: TConstructorIngredient = {
  _id: 'main1',
  name: 'Test Meat',
  type: 'main',
  proteins: 15,
  fat: 10,
  carbohydrates: 5,
  calories: 250,
  price: 120,
  image: '',
  image_large: '',
  image_mobile: '',
  id: 'meat-test-id',
};

const testSauce: TConstructorIngredient = {
  _id: 'sauce1',
  name: 'Test Sauce',
  type: 'sauce',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 50,
  price: 20,
  image: '',
  image_large: '',
  image_mobile: '',
  id: 'sauce-test-id',
};

describe('Constructor ingredients slice', () => {
  describe('Adding ingredients', () => {
    it('should add a bun', () => {
      const action = addIngredient(testBun);
      const newState = constructorSlice.reducer(constructorInitialState, action);

      expect(newState.constructor.bun).toEqual(expect.objectContaining({ _id: 'bun1' }));
      expect(newState.constructor.ingredients).toHaveLength(0);
    });

    it('should add a meat ingredient', () => {
      const action = addIngredient(testIngredient);
      const newState = constructorSlice.reducer(constructorInitialState, action);

      expect(newState.constructor.bun).toBeNull();
      expect(newState.constructor.ingredients).toHaveLength(1);
      expect(newState.constructor.ingredients[0]).toEqual(expect.objectContaining({ _id: 'main1' }));
    });
  });

  describe('Modifying ingredients in the store', () => {
    const testState = {
      constructor: {
        bun: testBun,
        ingredients: [testIngredient, testSauce],
      },
      ordering: false,
      order: null,
    };

    it('should move ingredient up', () => {
      const action = moveUp(1);
      const newState = constructorSlice.reducer(testState, action);

      expect(newState.constructor.ingredients[0]._id).toBe('sauce1');
      expect(newState.constructor.ingredients[1]._id).toBe('main1');
    });

    it('should not move first ingredient up', () => {
      const action = moveUp(0);
      const newState = constructorSlice.reducer(testState, action);

      expect(newState.constructor.ingredients[0]._id).toBe('main1');
    });

    it('should move ingredient down', () => {
      const action = moveDown(0);
      const newState = constructorSlice.reducer(testState, action);

      expect(newState.constructor.ingredients[0]._id).toBe('sauce1');
      expect(newState.constructor.ingredients[1]._id).toBe('main1');
    });

    it('should not move last ingredient down', () => {
      const action = moveDown(1);
      const newState = constructorSlice.reducer(testState, action);

      expect(newState.constructor.ingredients[1]._id).toBe('sauce1');
    });

    it('should remove an ingredient', () => {
      const action = removeIngredient('sauce-test-id');
      const newState = constructorSlice.reducer(testState, action);

      expect(newState.constructor.ingredients).toHaveLength(1);
      expect(newState.constructor.ingredients[0]._id).toBe('main1');
    });

    it('should clear constructor', () => {
      const action = clearConstructor();
      const newState = constructorSlice.reducer(testState, action);

      expect(newState.constructor.bun).toBeNull();
      expect(newState.constructor.ingredients).toHaveLength(0);
      expect(newState.order).toBeNull();
    });
  });

  describe('Async: BuyBurgerThunk', () => {
    const order: TOrder = {
      _id: 'order-id-123',
      status: 'done',
      name: 'Test Order',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      number: 12345,
      ingredients: ['ingredient-id-1', 'ingredient-id-2'],
    };

    it('should set status to true on pending', () => {
      const action = { type: 'constructor/construct/pending' };
      const newState = constructorSlice.reducer(constructorInitialState, action);

      expect(newState.ordering).toBe(true);
    });

    it('should save order and set status to false on fulfilled', () => {
      const action = {
        type: 'constructor/construct/fulfilled',
        payload: { order },
      };
      const newState = constructorSlice.reducer({ ...constructorInitialState, ordering: true }, action);

      expect(newState.ordering).toBe(false);
      expect(newState.order).toEqual(order);
    });

    it('should set status to false and log error on rejected', () => {
      const action = {
        type: 'constructor/construct/rejected',
        error: new Error('Something went wrong'),
      };
      const newState = constructorSlice.reducer({ ...constructorInitialState, ordering: true }, action);

      expect(newState.ordering).toBe(false);
      expect(newState.order).toBeNull();
    });
  });
});
