import axios from 'axios';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN,
  AUTH_ERROR
} from '../types/authTypes';

import { setError, clearError } from './errorActions';

const API = '/api/users';

export const registerUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}`, formData);
    dispatch({ type: REGISTER_SUCCESS, payload: {
      accessToken: res.data.token,
      refreshToken: '', // optional
      user: res.data.user
    }});
    dispatch(clearError());
  } catch (err) {
    dispatch(setError(err.response?.data?.msg || 'Registration failed'));
    dispatch({ type: AUTH_ERROR });
  }
};

export const loginUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/login`, formData);
    dispatch({ type: LOGIN_SUCCESS, payload: {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      user: res.data.user
    }});
    dispatch(clearError());
  } catch (err) {
    dispatch(setError(err.response?.data?.msg || 'Login failed'));
    dispatch({ type: AUTH_ERROR });
  }
};

export const refreshAccess = (refreshToken) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/refresh`, { refreshToken });
    dispatch({ type: REFRESH_TOKEN, payload: res.data.accessToken });
  } catch (err) {
    dispatch(setError('Token refresh failed'));
    dispatch({ type: AUTH_ERROR });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(clearError());
};
