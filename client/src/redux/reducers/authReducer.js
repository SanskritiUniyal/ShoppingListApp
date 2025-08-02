import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN,
  AUTH_ERROR
} from '../types/authTypes';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: true,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
        loading: false
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...initialState,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
