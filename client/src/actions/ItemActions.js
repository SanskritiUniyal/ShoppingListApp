import axios from 'axios';
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from './types';

// GET ITEMS VIA JWT TOKEN
export const getItems = () => async (dispatch, getState) => {
  dispatch(setItemsLoading());

  const token = getState().auth.accessToken;

  try {
    const res = await axios.get('/api/items', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: GET_ITEMS, payload: res.data });
  } catch (err) {
    console.error('GET items error:', err.response?.data?.msg || err.message);
  }
};

// POST/ADD ITEMS VIA JWT TOKEN
export const addItem = (item) => async (dispatch, getState) => {
  const token = getState().auth.accessToken;

  try {
    const res = await axios.post('/api/items', item, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: ADD_ITEM, payload: res.data });
  } catch (err) {
    console.error('ADD item error:', err.response?.data?.msg || err.message);
  }
};
 // DELETE ITEMS VIA JWT TOKEN
export const deleteItem = (id) => async (dispatch, getState) => {
  const token = getState().auth.accessToken;

  try {
    await axios.delete(`/api/items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: DELETE_ITEM, payload: id });
  } catch (err) {
    console.error('DELETE item error:', err.response?.data?.msg || err.message);
  }
};

export const setItemsLoading = () => ({ type: ITEMS_LOADING });
