import '../../index.css';
import styles from './app.module.css';

import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo, ProtectedRoute } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
} from '@pages';
import { fetchFeeds, fetchIngredients, fetchUser, setChecked } from '@slices';
import { useDispatch } from '@store';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchFeeds());
    dispatch(fetchUser())
      .unwrap()
      .catch(() => {})
      .finally(() => dispatch(setChecked()));
  }, [dispatch]);

  const onClose = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route
          element={<ConstructorPage />}
          path='/'
        />
        <Route
          element={<Feed />}
          path='/feed'
        />
        <Route
          element={<OrderInfo />}
          path='/feed/:number'
        />
        <Route
          element={<IngredientDetails />}
          path='/ingredients/:id'
        />

        <Route
          path='/login'
          element={
            <ProtectedRoute isPublic>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute isPublic>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isPublic>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          element={<OrderInfo />}
          path='/profile/orders/:number'
        />

        <Route
          element={<NotFound404 />}
          path='*'
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Ингридиент'
                onClose={onClose}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Заказ'
                onClose={onClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title='Заказ'
                  onClose={onClose}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
