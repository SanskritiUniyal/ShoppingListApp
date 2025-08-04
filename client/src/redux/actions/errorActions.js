import { SET_ERROR, CLEAR_ERROR } from '../types';

export const setError = (message) => ({
  type: SET_ERROR,
  payload: message
});

export const clearError = () => ({
  type: CLEAR_ERROR
});
