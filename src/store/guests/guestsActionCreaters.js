import { 
  GET_ALL_GUESTS_PENDING, GET_ALL_GUESTS_SUCCESS, GET_ALL_GUESTS_ERROR, 
} from './guestsActionTypes';
import { axiosInstance } from '../../utils/axiosInstance';

export const getAllGuestsPending = () => {
  return {
    type: GET_ALL_GUESTS_PENDING,
  }
}

export const getAllGuestsSuccess = (guests) => {
  return {
    type: GET_ALL_GUESTS_SUCCESS,
    payload: guests,
  }
}

export const getAllGuestsError = (error) => {
  return {
    type: GET_ALL_GUESTS_ERROR,
    payload: error,
  }
}

export const getAllGuestsAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(getAllGuestsPending());

      const response = await axiosInstance.get('/guests');

      console.log(response);

      dispatch(getAllGuestsSuccess(response.data.guests));
    } catch (error) {
      dispatch(getAllGuestsError(error));
    }
  }  
}