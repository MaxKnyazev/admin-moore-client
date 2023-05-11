import { 
  GET_ALL_GUESTS_PENDING, GET_ALL_GUESTS_SUCCESS, GET_ALL_GUESTS_ERROR, 
  ADD_GUEST_PENDING, ADD_GUEST_SUCCESS, ADD_GUEST_ERROR,
  EDIT_GUEST_PENDING, EDIT_GUEST_SUCCESS, EDIT_GUEST_ERROR,
  CALCULATE_MONEY_PENDING, CALCULATE_MONEY_SUCCESS, CALCULATE_MONEY_ERROR,
  CALCULATE_BREAK_PENDING, CALCULATE_BREAK_SUCCESS, CALCULATE_BREAK_ERROR,
  CHANGE_SEARCH_INPUT_SUCCESS, CHANGE_SEARCH_INPUT_ERROR,
} from './guestsActionTypes';
import { axiosInstance } from '../../utils/axiosInstance';
import { calculateResultMoneyAsync } from '../shifts/shiftsActionCreaters';

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

      dispatch(editGuestSuccess({ id, guest }));
      dispatch(calculateResultMoneyAsync(guest.shifts_id));
    } catch (error) {
      dispatch(editGuestError(error));
    }
  }  
}



export const calculateMoneyPending = () => {
  return {
    type: CALCULATE_MONEY_PENDING,
  }
}

export const calculateMoneySuccess = ({ id, guest }) => {
  return {
    type: CALCULATE_MONEY_SUCCESS,
    payload: {
      id,
      guest
    },
  }
}

export const calculateMoneyError = (error) => {
  return {
    type: CALCULATE_MONEY_ERROR,
    payload: error,
  }
}

export const calculateMoneyAsync = ({ id, stopTime }) => {
  return async (dispatch) => {
    try {
      dispatch(calculateMoneyPending());

      const response = await axiosInstance.put(`/guests/calculate/${id}`, { stopTime });
      const guest = response.data.calculatedGuest;

      dispatch(calculateMoneySuccess({ id, guest }));
    } catch (error) {
      dispatch(calculateMoneyError(error));
    }
  }  
}



export const calculateBreakPending = () => {
  return {
    type: CALCULATE_BREAK_PENDING,
  }
}

export const calculateBreakSuccess = ({ id, guest }) => {
  return {
    type: CALCULATE_BREAK_SUCCESS,
    payload: {
      id,
      guest
    },
  }
}

export const calculateBreakError = (error) => {
  return {
    type: CALCULATE_BREAK_ERROR,
    payload: error,
  }
}

export const calculateBreakAsync = ({ id, breakStopTime }) => {
  return async (dispatch) => {
    try {
      dispatch(calculateBreakPending());

      const response = await axiosInstance.put(`/guests/break/${id}`, { breakStopTime });
      const guest = response.data.breakGuest;

      dispatch(calculateBreakSuccess({ id, guest }));
    } catch (error) {
      dispatch(calculateBreakError(error));
    }
  }  
}



export const changeSearchInputSuccess = (value) => {
  return {
    type: CHANGE_SEARCH_INPUT_SUCCESS,
    payload: value,
  }
}

export const changeSearchInputError = (error) => {
  return {
    type: CHANGE_SEARCH_INPUT_ERROR,
    payload: error,
  }
}

export const changeSearchInput = (value) => {
  return (dispatch) => {
    try {
      dispatch(changeSearchInputSuccess(value));
    } catch (error) {
      dispatch(changeSearchInputError(error));
    }
  }  
}