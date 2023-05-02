import { 
  GET_ALL_CASHBOX_LOGS_PENDING, GET_ALL_CASHBOX_LOGS_SUCCESS, GET_ALL_CASHBOX_LOGS_ERROR, 
  ADD_CASHBOX_LOG_PENDING, ADD_CASHBOX_LOG_SUCCESS, ADD_CASHBOX_LOG_ERROR, 
} from './cashboxLogsActionTypes';
import { axiosInstance } from '../../utils/axiosInstance';

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
    } catch (error) {
      dispatch(addCashboxLogError(error));
    }
  }  
}



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