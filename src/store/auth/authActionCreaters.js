import { 
  SET_USER_PENDING, SET_USER_SUCCESS, SET_USER_ERROR,
} from './authActionTypes';
import { axiosInstance } from '../../utils/axiosInstance';

export const setUserPending = () => {
  return {
    type: SET_USER_PENDING,
  }
}

export const setUserSuccess = (user) => {
  return {
    type: SET_USER_SUCCESS,
    payload: user,
  }
}

export const setUserError = (error) => {
  return {
    type: SET_USER_ERROR,
    payload: error,
  }
}

export const setUserAsync = () => {
  return async (dispatch) => {
    try {
      // dispatch(setUserPending());

      // const response = await axiosInstance.get('/auth');
      // const guests = response.data.guests;
      // console.log(response);

      // dispatch(setUserSuccess(guests));
    } catch (error) {
      // dispatch(setUserError(error));
    }
  }  
}