import axios from 'axios'
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "../constants/userConstants"
import { PRODUCT_LIST_FAIL } from '../constants/productConstants'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const {data} = await axios.post(
      `${API_BASE_URL}/api/users/login`,
      {email, password}, 
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch(error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
    })
  }
}

