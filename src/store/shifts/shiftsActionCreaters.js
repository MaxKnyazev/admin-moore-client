import { 
  SET_CURRENT_SHIFT_PENDING, SET_CURRENT_SHIFT_SUCCESS, SET_CURRENT_SHIFT_ERROR,
} from './shiftsActionTypes';
import { axiosInstance } from '../../utils/axiosInstance';

export const setCurrentShiftPending = () => {
  return {
    type: SET_CURRENT_SHIFT_PENDING,
  }
}

export const setCurrentShiftSuccess = (user) => {
  return {
    type: SET_CURRENT_SHIFT_SUCCESS,
    payload: user,
  }
}

export const setCurrentShiftError = (error) => {
  return {
    type: SET_CURRENT_SHIFT_ERROR,
    payload: error,
  }
}

export const setCurrentShiftAsync = () => {
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