import axios from 'axios';
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/items')
    .then(res => dispatch({ type: GET_ITEMS, payload: res.data }))
    .catch(err => console.error('GET error:', err));
};

export const addItem = (item) => dispatch => {
  axios.post('/api/items', item)
    .then(res => dispatch({ type: ADD_ITEM, payload: res.data }))
    .catch(err => console.error('POST error:', err));
};

export const deleteItem = (id) => dispatch => {
  axios.delete(`/api/items/${id}`)
    .then(() => dispatch({ type: DELETE_ITEM, payload: id }))
    .catch(err => console.error('DELETE error:', err));
};

export const setItemsLoading = () => {
  return { type: ITEMS_LOADING };
};
