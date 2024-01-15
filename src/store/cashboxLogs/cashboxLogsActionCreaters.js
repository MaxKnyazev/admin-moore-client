import { 
  GET_ALL_CASHBOX_LOGS_PENDING, GET_ALL_CASHBOX_LOGS_SUCCESS, GET_ALL_CASHBOX_LOGS_ERROR, 
  ADD_CASHBOX_LOG_PENDING, ADD_CASHBOX_LOG_SUCCESS, ADD_CASHBOX_LOG_ERROR,
  TOGGLE_SHOW_CASHBOX_MODAL_SUCCESS, TOGGLE_SHOW_CASHBOX_MODAL_ERROR,
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



export const toggleShowCashboxModalSuccess = () => {
  return {
    type: TOGGLE_SHOW_CASHBOX_MODAL_SUCCESS,
  }
}

export const toggleShowCashboxModalError = (error) => {
  return {
    type: TOGGLE_SHOW_CASHBOX_MODAL_ERROR,
    payload: error,
  }
}

export const toggleShowCashboxModal = () => {
  return (dispatch) => {
    try {
      dispatch(toggleShowCashboxModalSuccess());
    } catch (error) {
      dispatch(toggleShowCashboxModalError(error));
    }
  }  
}