import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_FAIL
} from '../constants/productConstants.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_LIST_REQUEST})
    const {data} = await axios.get(`${API_BASE_URL}/api/products`)
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch(error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  } 
}