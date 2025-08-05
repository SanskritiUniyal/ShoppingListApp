import axios from 'axios';
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING } from '../redux/actions/types';

// Get Items (with JWT token)
export const getItems = () => async (dispatch, getState) => {
  dispatch(setItemsLoading());
  try {
    const token = getState().auth.accessToken;
    const res = await axios.get('/api/items', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: GET_ITEMS, payload: res.data });
  } catch (error) {
    console.error('Error fetching items:', error.response?.data?.msg || error.message);
  }
};

// Add Item (with JWT token)
export const addItem = (item) => async (dispatch, getState) => {
  try {
    const token = getState().auth.accessToken;
    const res = await axios.post('/api/items', item, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: ADD_ITEM, payload: res.data });
  } catch (err) {
    console.error('POST error:', err.response?.data?.msg || err.message);
  }
};

// Delete Item (with JWT token)
export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    const token = getState().auth.accessToken;
    await axios.delete(`/api/items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: DELETE_ITEM, payload: id });
  } catch (err) {
    console.error('DELETE error:', err.response?.data?.msg || err.message);
  }
};

export const setItemsLoading = () => {
  return { type: ITEMS_LOADING };
};
