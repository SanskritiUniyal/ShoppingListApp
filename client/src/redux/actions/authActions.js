import axios from 'axios';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN,
  AUTH_ERROR
} from '../types';
import { setError, clearError } from './errorActions';
import { toast } from 'react-toastify';

const API = '/api/users';

export const registerUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}`, formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        accessToken: res.data.token,
        refreshToken: '',
        user: res.data.user
      }
    });
    dispatch(clearError());
    toast.success(`Welcome, ${res.data.user.name}! Registration complete.`);
  } catch (err) {
    dispatch(setError(err.response?.data?.msg || 'Registration failed'));
    dispatch({ type: AUTH_ERROR });
    toast.error('Registration failed');
  }
};

export const loginUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/login`, formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        user: res.data.user
      }
    });
    dispatch(clearError());
    toast.success(`Welcome back, ${res.data.user.name}!`);
  } catch (err) {
    dispatch(setError(err.response?.data?.msg || 'Login failed'));
    dispatch({ type: AUTH_ERROR });
    toast.error('Login failed. Please check your credentials.');
  }
};

export const refreshAccess = (refreshToken) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/refresh`, { refreshToken });
    dispatch({ type: REFRESH_TOKEN, payload: res.data.accessToken });
  } catch (err) {
    dispatch(setError('Token refresh failed'));
    dispatch({ type: AUTH_ERROR });
    toast.error('Session expired. Please login again.');
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(clearError());
  toast.info('You have been logged out.');
};
