import { 
  GET_ALL_GUESTS_PENDING, GET_ALL_GUESTS_SUCCESS, GET_ALL_GUESTS_ERROR, 
  ADD_GUEST_PENDING, ADD_GUEST_SUCCESS, ADD_GUEST_ERROR,
  EDIT_GUEST_PENDING, EDIT_GUEST_SUCCESS, EDIT_GUEST_ERROR,
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
      const guests = response.data.guests;
      console.log(response);

      dispatch(getAllGuestsSuccess(guests));
    } catch (error) {
      dispatch(getAllGuestsError(error));
    }
  }  
}



export const addGuestPending = () => {
  return {
    type: ADD_GUEST_PENDING,
  }
}

export const addGuestSuccess = (guest) => {
  return {
    type: ADD_GUEST_SUCCESS,
    payload: guest,
  }
}

export const addGuestError = (error) => {
  return {
    type: ADD_GUEST_ERROR,
    payload: error,
  }
}

export const addGuestAsync = (options) => {
  return async (dispatch) => {
    try {
      dispatch(addGuestPending());

      const response = await axiosInstance.post('/guests/add', options);
      const guest = response.data.guest;
      console.log(response);

      dispatch(addGuestSuccess(guest));
    } catch (error) {
      dispatch(addGuestError(error));
    }
  }  
}



export const editGuestPending = () => {
  return {
    type: EDIT_GUEST_PENDING,
  }
}

export const editGuestSuccess = ({ id, guest }) => {
  return {
    type: EDIT_GUEST_SUCCESS,
    payload: {
      id,
      guest
    },
  }
}

export const editGuestError = (error) => {
  return {
    type: EDIT_GUEST_ERROR,
    payload: error,
  }
}

export const editGuestAsync = ({ id, options }) => {
  return async (dispatch) => {
    try {
      dispatch(editGuestPending());

      const response = await axiosInstance.put(`/guests/edit/${id}`, options);
      const guest = response.data.editedGuest;
      console.log(response);

      dispatch(editGuestSuccess(guest));
    } catch (error) {
      dispatch(editGuestError(error));
    }
  }  
}