// src/redux/actions/ItemActions.js
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEM_ERROR
} from './types';
import api from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

export const getItems = () => async dispatch => {
  try {
    const res = await api.get('/items');
    dispatch({ type: GET_ITEMS, payload: res.data });
  } catch (err) {
    console.error('GET items error:', err.response?.data?.msg || err.message);
    dispatch({ type: ITEM_ERROR });
  }
};

export const addItem = (itemData) => async dispatch => {
  try {
    const res = await api.post('/items', itemData);
    dispatch({ type: ADD_ITEM, payload: res.data });
    toast.success('Item added!');
  } catch (err) {
    console.error('ADD item error:', err.response?.data?.msg || err.message);
    toast.error(err.response?.data?.msg || 'Failed to add item');
    dispatch({ type: ITEM_ERROR });
  }
};

export const deleteItem = (id) => async dispatch => {
  try {
    await api.delete(`/items/${id}`);
    dispatch({ type: DELETE_ITEM, payload: id });
    toast.success('Item deleted!');
  } catch (err) {
    console.error('DELETE item error:', err.response?.data?.msg || err.message);
    toast.error(err.response?.data?.msg || 'Failed to delete item');
    dispatch({ type: ITEM_ERROR });
  }
};
