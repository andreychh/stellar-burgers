/**
 * @jest-environment jsdom
 */
import {
  forgotPasswordApi,
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi,
} from '@api';
import { deleteCookie } from '@utils-cookie';

jest.mock('@utils-cookie');

const mockFetch = jest.fn();
global.fetch = mockFetch;

const TEST_DATA = {
  USER: {
    name: 'TestUser',
    email: 'test@example.com',
    password: 'testPassword123',
  },
  TOKENS: {
    access: 'mock-access-token',
    refresh: 'mock-refresh-token',
  },
  ORDER: {
    number: 12345,
    ingredients: ['ingredient-1', 'ingredient-2'],
  },
  INGREDIENT: {
    _id: 'test-ingredient-id',
    name: 'Test Ingredient',
  },
};

const RESPONSES = {
  SUCCESS: { success: true },
  FAILURE: { success: false },
  EMPTY: {},
} as const;

const mockResponse = (ok: boolean, body: any) =>
  ({
    ok,
    json: () => Promise.resolve(body),
  }) as Response;

const mockSuccessResponse = (data: any) => mockResponse(true, { ...RESPONSES.SUCCESS, ...data });
const mockFailureResponse = () => mockResponse(true, RESPONSES.FAILURE);
const mockEmptyResponse = () => mockResponse(true, RESPONSES.EMPTY);

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(window, 'localStorage', {
    value: (() => {
      let store: Record<string, string> = {};
      return {
        getItem: jest.fn((key: string) => store[key]),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete store[key];
        }),
        clear: () => {
          store = {};
        },
      };
    })(),
    writable: true,
  });
  document.cookie = '';
});

describe('Authentication APIs', () => {
  describe('registerUserApi', () => {
    const registerData = {
      name: TEST_DATA.USER.name,
      email: TEST_DATA.USER.email,
      password: TEST_DATA.USER.password,
    };

    it('returns new user data on success', async () => {
      mockFetch.mockResolvedValueOnce(
        mockSuccessResponse({
          accessToken: TEST_DATA.TOKENS.access,
          refreshToken: TEST_DATA.TOKENS.refresh,
          user: { name: TEST_DATA.USER.name, email: TEST_DATA.USER.email },
        })
      );

      const result = await registerUserApi(registerData);
      expect(result.user.name).toBe(TEST_DATA.USER.name);
    });

    it('rejects on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockFailureResponse());
      await expect(registerUserApi(registerData)).rejects.toEqual(RESPONSES.FAILURE);
    });

    it('rejects if success is missing', async () => {
      mockFetch.mockResolvedValueOnce(mockEmptyResponse());
      await expect(registerUserApi(registerData)).rejects.toEqual(RESPONSES.EMPTY);
    });
  });

  describe('loginUserApi', () => {
    const loginData = {
      email: TEST_DATA.USER.email,
      password: TEST_DATA.USER.password,
    };

    it('returns auth data on success', async () => {
      mockFetch.mockResolvedValueOnce(
        mockSuccessResponse({
          accessToken: TEST_DATA.TOKENS.access,
          refreshToken: TEST_DATA.TOKENS.refresh,
          user: { name: TEST_DATA.USER.name, email: TEST_DATA.USER.email },
        })
      );

      const result = await loginUserApi(loginData);
      expect(result.user.email).toBe(TEST_DATA.USER.email);
    });

    it('rejects on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockFailureResponse());
      await expect(loginUserApi(loginData)).rejects.toEqual(RESPONSES.FAILURE);
    });

    it('rejects if success is missing', async () => {
      mockFetch.mockResolvedValueOnce(mockEmptyResponse());
      await expect(loginUserApi(loginData)).rejects.toEqual(RESPONSES.EMPTY);
    });
  });

  describe('logoutApi', () => {
    it('clears storage and cookie on success', async () => {
      mockFetch.mockResolvedValueOnce(mockSuccessResponse({}));
      localStorage.setItem('refreshToken', TEST_DATA.TOKENS.refresh);

      const result = await logoutApi();
      expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
      expect(deleteCookie).toHaveBeenCalledWith('accessToken');
      expect(result.success).toBe(true);
    });

    it('does not clear storage on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockFailureResponse());

      const result = await logoutApi();
      expect(localStorage.removeItem).not.toHaveBeenCalled();
      expect(deleteCookie).not.toHaveBeenCalled();
      expect(result.success).toBe(false);
    });

    it('does not clear storage if success is missing', async () => {
      mockFetch.mockResolvedValueOnce(mockEmptyResponse());

      const result = await logoutApi();
      expect(deleteCookie).not.toHaveBeenCalled();
      expect(result).toEqual(RESPONSES.EMPTY);
    });
  });
});

describe('Password Management APIs', () => {
  describe('forgotPasswordApi', () => {
    const emailData = { email: TEST_DATA.USER.email };

    it('returns result on success', async () => {
      mockFetch.mockResolvedValueOnce(mockSuccessResponse({}));
      const result = await forgotPasswordApi(emailData);
      expect(result.success).toBe(true);
    });

    it('rejects on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockFailureResponse());
      await expect(forgotPasswordApi(emailData)).rejects.toEqual(RESPONSES.FAILURE);
    });

    it('rejects if success is missing', async () => {
      mockFetch.mockResolvedValueOnce(mockEmptyResponse());
      await expect(forgotPasswordApi(emailData)).rejects.toEqual(RESPONSES.EMPTY);
    });
  });

  describe('resetPasswordApi', () => {
    const resetData = { password: TEST_DATA.USER.password, token: 'reset-token' };

    it('returns result on success', async () => {
      mockFetch.mockResolvedValueOnce(mockSuccessResponse({}));
      const result = await resetPasswordApi(resetData);
      expect(result.success).toBe(true);
    });

    it('rejects on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockFailureResponse());
      await expect(resetPasswordApi(resetData)).rejects.toEqual(RESPONSES.FAILURE);
    });

    it('rejects if success is missing', async () => {
      mockFetch.mockResolvedValueOnce(mockEmptyResponse());
      await expect(resetPasswordApi(resetData)).rejects.toEqual(RESPONSES.EMPTY);
    });
  });
});

describe('User Management APIs', () => {
  describe('getUserApi', () => {
    it('returns user data on success', async () => {
      mockFetch.mockResolvedValueOnce(
        mockSuccessResponse({
          user: { name: TEST_DATA.USER.name, email: TEST_DATA.USER.email },
        })
      );

      const result = await getUserApi();
      expect(result.user.name).toBe(TEST_DATA.USER.name);
    });

    it('rejects on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockFailureResponse());
      await expect(getUserApi()).rejects.toEqual(RESPONSES.FAILURE);
    });
  });

  describe('updateUserApi', () => {
    const updateData = { name: 'UpdatedName' };

    it('returns updated user data on success', async () => {
      mockFetch.mockResolvedValueOnce(
        mockSuccessResponse({
          user: { name: 'UpdatedName', email: TEST_DATA.USER.email },
        })
      );

      const result = await updateUserApi(updateData);
      expect(result.user.name).toBe('UpdatedName');
    });

    it('rejects on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockResponse(true, { success: false, user: null }));
      await expect(updateUserApi(updateData)).rejects.toEqual({ success: false, user: null });
    });

    it('rejects if success is missing', async () => {
      mockFetch.mockResolvedValueOnce(mockEmptyResponse());
      await expect(updateUserApi(updateData)).rejects.toEqual(RESPONSES.EMPTY);
    });
  });
});

describe('Application Data APIs', () => {
  describe('getIngredientsApi', () => {
    it('returns ingredients on success', async () => {
      mockFetch.mockResolvedValueOnce(
        mockSuccessResponse({
          data: [TEST_DATA.INGREDIENT],
        })
      );

      const result = await getIngredientsApi();
      expect(result).toEqual([TEST_DATA.INGREDIENT]);
    });

    it('rejects on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockFailureResponse());
      await expect(getIngredientsApi()).rejects.toEqual(RESPONSES.FAILURE);
    });

    it('rejects if success is missing', async () => {
      mockFetch.mockResolvedValueOnce(mockResponse(true, { data: [] }));
      await expect(getIngredientsApi()).rejects.toEqual({ data: [] });
    });
  });

  describe('getFeedsApi', () => {
    const feedsData = {
      orders: [{ number: TEST_DATA.ORDER.number }],
      total: 100,
      totalToday: 5,
    };

    it('returns feeds on success', async () => {
      mockFetch.mockResolvedValueOnce(mockSuccessResponse(feedsData));
      const result = await getFeedsApi();
      expect(result.total).toBe(100);
      expect(result.totalToday).toBe(5);
    });

    it('rejects on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockFailureResponse());
      await expect(getFeedsApi()).rejects.toEqual(RESPONSES.FAILURE);
    });
  });
});

describe('Orders APIs', () => {
  describe('orderBurgerApi', () => {
    it('returns order data on success', async () => {
      mockFetch.mockResolvedValueOnce(
        mockSuccessResponse({
          order: { number: TEST_DATA.ORDER.number },
          name: 'Delicious Burger',
        })
      );

      const result = await orderBurgerApi(TEST_DATA.ORDER.ingredients);
      expect(result.name).toBe('Delicious Burger');
      expect(result.order.number).toBe(TEST_DATA.ORDER.number);
    });

    it('rejects on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockFailureResponse());
      await expect(orderBurgerApi(TEST_DATA.ORDER.ingredients)).rejects.toEqual(RESPONSES.FAILURE);
    });
  });

  describe('getOrdersApi', () => {
    const ordersData = {
      orders: [{ number: TEST_DATA.ORDER.number }],
      total: 10,
      totalToday: 2,
    };

    it('returns orders on success', async () => {
      mockFetch.mockResolvedValueOnce(mockSuccessResponse(ordersData));
      const result = await getOrdersApi();
      expect(result).toEqual(ordersData.orders);
      expect(result[0].number).toBe(TEST_DATA.ORDER.number);
    });

    it('rejects on failure', async () => {
      mockFetch.mockResolvedValueOnce(mockFailureResponse());
      await expect(getOrdersApi()).rejects.toEqual(RESPONSES.FAILURE);
    });
  });

  describe('getOrderByNumberApi', () => {
    it('returns specific order', async () => {
      mockFetch.mockResolvedValueOnce(
        mockSuccessResponse({
          orders: [{ number: TEST_DATA.ORDER.number }],
        })
      );

      const result = await getOrderByNumberApi(TEST_DATA.ORDER.number);
      expect(result.orders[0].number).toBe(TEST_DATA.ORDER.number);
    });

    it('handles different scenarios correctly', async () => {
      const testCases = [77, 123];

      for (const orderNumber of testCases) {
        mockFetch.mockResolvedValueOnce(
          mockSuccessResponse({
            orders: [{ number: orderNumber }],
          })
        );

        const result = await getOrderByNumberApi(orderNumber);
        expect(result.orders[0].number).toBe(orderNumber);
      }
    });
  });
});
