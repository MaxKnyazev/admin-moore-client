import { 
  GET_ALL_GUESTS_PENDING, GET_ALL_GUESTS_SUCCESS, GET_ALL_GUESTS_ERROR, 
  GET_GUESTS_BY_SHIFTS_ID_PENDING, GET_GUESTS_BY_SHIFTS_ID_SUCCESS, GET_GUESTS_BY_SHIFTS_ID_ERROR,
  ADD_GUEST_PENDING, ADD_GUEST_SUCCESS, ADD_GUEST_ERROR,
  ADD_GROUP_PENDING, ADD_GROUP_SUCCESS, ADD_GROUP_ERROR,
  EDIT_GUEST_PENDING, EDIT_GUEST_SUCCESS, EDIT_GUEST_ERROR,
  CALCULATE_MONEY_PENDING, CALCULATE_MONEY_SUCCESS, CALCULATE_MONEY_ERROR,
  CALCULATE_BREAK_PENDING, CALCULATE_BREAK_SUCCESS, CALCULATE_BREAK_ERROR,
  CHANGE_SEARCH_INPUT_SUCCESS, CHANGE_SEARCH_INPUT_ERROR,
  TOGGLE_SHOW_ADD_GROUP_MODAL_SUCCESS, TOGGLE_SHOW_ADD_GROUP_MODAL_ERROR,
  TOGGLE_SHOW_ADD_GUEST_MODAL_SUCCESS, TOGGLE_SHOW_ADD_GUEST_MODAL_ERROR,
  TOGGLE_SHOW_PAYMENT_GROUP_MODAL_SUCCESS, TOGGLE_SHOW_PAYMENT_GROUP_MODAL_ERROR,
  SET_CURRENT_GROUP_PENDING, SET_CURRENT_GROUP_SUCCESS, SET_CURRENT_GROUP_ERROR,
  NOT_SHOW_PAYMENT_MODAL,
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



export const getGuestsByShiftsIdPending = () => {
  return {
    type: GET_GUESTS_BY_SHIFTS_ID_PENDING,
  }
}

export const getGuestsByShiftsIdSuccess = (guests) => {
  return {
    type: GET_GUESTS_BY_SHIFTS_ID_SUCCESS,
    payload: guests,
  }
}

export const getGuestsByShiftsIdError = (error) => {
  return {
    type: GET_GUESTS_BY_SHIFTS_ID_ERROR,
    payload: error,
  }
}

export const getGuestsByShiftsIdAsync = (shiftsId) => {
  return async (dispatch) => {
    try {
      dispatch(getGuestsByShiftsIdPending());

      const response = await axiosInstance.get(`/guests/getByShiftsId/${shiftsId}`);
      const { guestsByShiftsId } = response.data;

      dispatch(getGuestsByShiftsIdSuccess(guestsByShiftsId));
    } catch (error) {
      dispatch(getGuestsByShiftsIdError(error));
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



export const addGroupPending = () => {
  return {
    type: ADD_GROUP_PENDING,
  }
}

export const addGroupSuccess = (guest) => {
  return {
    type: ADD_GROUP_SUCCESS,
    payload: guest,
  }
}

export const addGroupError = (error) => {
  return {
    type: ADD_GROUP_ERROR,
    payload: error,
  }
}

export const addGroupAsync = (options) => {
  return async (dispatch) => {
    try {
      dispatch(addGroupPending());

      const response = await axiosInstance.post('/guests/addGroup', options);
      const group = response.data.group;

      dispatch(addGroupSuccess(group));
    } catch (error) {
      dispatch(addGroupError(error));
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





export const notShowPaymentModal = ({id, options}) => {
  return {
    type: NOT_SHOW_PAYMENT_MODAL,
    payload: {
      id,
      options,
    },
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



export const toggleShowAddGroupModalSuccess = () => {
  return {
    type: TOGGLE_SHOW_ADD_GROUP_MODAL_SUCCESS,
  }
}

export const toggleShowAddGroupModalError = (error) => {
  return {
    type: TOGGLE_SHOW_ADD_GROUP_MODAL_ERROR,
    payload: error,
  }
}

export const toggleShowAddGroupModal = () => {
  return (dispatch) => {
    try {
      dispatch(toggleShowAddGroupModalSuccess());
    } catch (error) {
      dispatch(toggleShowAddGroupModalError(error));
    }
  }  
}



export const toggleShowAddGuestModalSuccess = () => {
  return {
    type: TOGGLE_SHOW_ADD_GUEST_MODAL_SUCCESS,
  }
}

export const toggleShowAddGuestModalError = (error) => {
  return {
    type: TOGGLE_SHOW_ADD_GUEST_MODAL_ERROR,
    payload: error,
  }
}

export const toggleShowAddGuestModal = () => {
  return (dispatch) => {
    try {
      dispatch(toggleShowAddGuestModalSuccess());
    } catch (error) {
      dispatch(toggleShowAddGuestModalError(error));
    }
  }  
}



export const toggleShowPaymentGroupModalSuccess = () => {
  return {
    type: TOGGLE_SHOW_PAYMENT_GROUP_MODAL_SUCCESS,
  }
}

export const toggleShowPaymentGroupModalError = (error) => {
  return {
    type: TOGGLE_SHOW_PAYMENT_GROUP_MODAL_ERROR,
    payload: error,
  }
}

export const toggleShowPaymentGroupModal = () => {
  return (dispatch) => {
    try {
      dispatch(toggleShowPaymentGroupModalSuccess());
    } catch (error) {
      dispatch(toggleShowPaymentGroupModalError(error));
    }
  }  
}



export const setCurrentGroupPending = () => {
  return {
    type: SET_CURRENT_GROUP_PENDING,
  }
}

export const setCurrentGroupSuccess = (group) => {
  return {
    type: SET_CURRENT_GROUP_SUCCESS,
    payload: group,
  }
}

export const setCurrentGroupError = (error) => {
  return {
    type: SET_CURRENT_GROUP_ERROR,
    payload: error,
  }
}

export const setCurrentGroupAsync = (groupId) => {
  return async (dispatch) => {
    try {
      dispatch(setCurrentGroupPending());

      const response = await axiosInstance.get(`/guests/getByGroupId/${groupId}`);
      const group = response.data.guestsByGroupId;

      dispatch(setCurrentGroupSuccess(group));
    } catch (error) {
      dispatch(setCurrentGroupError(error));
    }
  }  
}