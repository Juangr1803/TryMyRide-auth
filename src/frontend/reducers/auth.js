import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const name =
  document.cookie.indexOf('name=') === -1
    ? ''
    : ('; ' + document.cookie).split('; name=')[1].split(';')[0];
const email =
  document.cookie.indexOf('email=') === -1
    ? ''
    : ('; ' + document.cookie).split('; email=')[1].split(';')[0];
const id =
  document.cookie.indexOf('id=') === -1
    ? ''
    : ('; ' + document.cookie).split('; id=')[1].split(';')[0];
const token =
  document.cookie.indexOf('token=') === -1
    ? ''
    : ('; ' + document.cookie).split('; token=')[1].split(';')[0];

const user = {
  name,
  email,
  id,
  token,
};

const initialState = user.id
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
