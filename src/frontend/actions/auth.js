import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  SET_MESSAGE,
} from './types';
// Services
import AuthService from '../services/auth';

//---------------------------------------------------//
//---------------------------------------------------//

// Update data User
export const updateUser = (name, email, password, id) => async (dispatch) => {
  await AuthService.updatedUser(name, email, password, id)
    .then((response) => {
      dispatch({
        type: UPDATE_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      console.log(response);

      return Promise.resolve();
    })
    .catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      console.log(error);

      return Promise.reject();
    });
};
// Register
export const register = (name, email, password) => (dispatch) => {
  return AuthService.registerUser(name, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

// Login
export const login = (email, password, token) => (dispatch) => {
  return AuthService.loginUser(email, password, token).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      console.log(data);

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      console.log(error);

      return Promise.reject();
    }
  );
};

// Logout
export const logout = () => (dispatch) => {
  AuthService.logoutUser();

  dispatch({
    type: LOGOUT,
  });
};
