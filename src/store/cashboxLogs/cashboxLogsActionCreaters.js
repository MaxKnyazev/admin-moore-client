import { 
  GET_ALL_CASHBOX_LOGS_PENDING, GET_ALL_CASHBOX_LOGS_SUCCESS, GET_ALL_CASHBOX_LOGS_ERROR, 
  ADD_CASHBOX_LOG_PENDING, ADD_CASHBOX_LOG_SUCCESS, ADD_CASHBOX_LOG_ERROR,
  TOGGLE_SHOW_CASHBOX_MODAL_SUCCESS, TOGGLE_SHOW_CASHBOX_MODAL_ERROR,
  // CALCULATE_RESULT_MONEY_PENDING, CALCULATE_RESULT_MONEY_SUCCESS, CALCULATE_RESULT_MONEY_ERROR,
} from './cashboxLogsActionTypes';
import { axiosInstance } from '../../utils/axiosInstance';
import { calculateResultMoneyAsync } from '../shifts/shiftsActionCreaters';

export const getAllCashboxLogsPending = () => {
  return {
    type: GET_ALL_CASHBOX_LOGS_PENDING,
  }
}

export const getAllCashboxLogsSuccess = (guests) => {
  return {
    type: GET_ALL_CASHBOX_LOGS_SUCCESS,
    payload: guests,
  }
}

export const getAllCashboxLogsError = (error) => {
  return {
    type: GET_ALL_CASHBOX_LOGS_ERROR,
    payload: error,
  }
}

export const getAllCashboxLogsAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(getAllCashboxLogsPending());

      const response = await axiosInstance.get('/cashbox');
      const cashboxLogs = response.data.cashboxLogs;

      dispatch(getAllCashboxLogsSuccess(cashboxLogs));
    } catch (error) {
      dispatch(getAllCashboxLogsError(error));
    }
  }  
}



export const addCashboxLogPending = () => {
  return {
    type: ADD_CASHBOX_LOG_PENDING,
  }
}

export const addCashboxLogSuccess = (cashboxLog) => {
  return {
    type: ADD_CASHBOX_LOG_SUCCESS,
    payload: cashboxLog,
  }
}

export const addCashboxLogError = (error) => {
  return {
    type: ADD_CASHBOX_LOG_ERROR,
    payload: error,
  }
}

export const addCashboxLogAsync = (options) => {
  return async (dispatch) => {
    try {
      dispatch(addCashboxLogPending());

      const response = await axiosInstance.post('/cashbox/add', options);
      const cashboxLog = response.data.cashboxLog;

      dispatch(addCashboxLogSuccess(cashboxLog));
      dispatch(calculateResultMoneyAsync(cashboxLog.shifts_id));
    } catch (error) {
      dispatch(addCashboxLogError(error));
    }
  }  
}



// export const calculateResultMoneyPending = () => {
//   return {
//     type: CALCULATE_RESULT_MONEY_PENDING,
//   }
// }

// export const calculateResultMoneySuccess = (result) => {
//   return {
//     type: CALCULATE_RESULT_MONEY_SUCCESS,
//     payload: result,
//   }
// }

// export const calculateResultMoneyError = (error) => {
//   return {
//     type: CALCULATE_RESULT_MONEY_ERROR,
//     payload: error,
//   }
// }

// export const calculateResultMoneyAsync = (shiftId) => {
//   return async (dispatch) => {
//     try {
//       dispatch(calculateResultMoneyPending());
//       let result = {};

//       const response = await axiosInstance.post('/cashbox/add', shiftId);
//       const cashboxLog = response.data.cashboxLog;

//       dispatch(calculateResultMoneySuccess(result));
//     } catch (error) {
//       dispatch(calculateResultMoneyError(error));
//     }
//   }  
// }



// export const editGuestPending = () => {
//   return {
//     type: EDIT_GUEST_PENDING,
//   }
// }

// export const editGuestSuccess = ({ id, guest }) => {
//   return {
//     type: EDIT_GUEST_SUCCESS,
//     payload: {
//       id,
//       guest
//     },
//   }
// }

// export const editGuestError = (error) => {
//   return {
//     type: EDIT_GUEST_ERROR,
//     payload: error,
//   }
// }

// export const editGuestAsync = ({ id, options }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(editGuestPending());

//       const response = await axiosInstance.put(`/guests/edit/${id}`, options);
//       const guest = response.data.editedGuest;
//       console.log(response);

//       dispatch(editGuestSuccess({ id, guest }));
//     } catch (error) {
//       dispatch(editGuestError(error));
//     }
//   }  
// }