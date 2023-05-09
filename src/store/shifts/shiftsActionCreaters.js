import { 
  SET_CURRENT_SHIFT_PENDING, SET_CURRENT_SHIFT_SUCCESS, SET_CURRENT_SHIFT_ERROR,
  CALCULATE_RESULT_MONEY_PENDING, CALCULATE_RESULT_MONEY_SUCCESS, CALCULATE_RESULT_MONEY_ERROR,
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



export const calculateResultMoneyPending = () => {
  return {
    type: CALCULATE_RESULT_MONEY_PENDING,
  }
}

export const calculateResultMoneySuccess = (result) => {
  return {
    type: CALCULATE_RESULT_MONEY_SUCCESS,
    payload: result,
  }
}

export const calculateResultMoneyError = (error) => {
  return {
    type: CALCULATE_RESULT_MONEY_ERROR,
    payload: error,
  }
}

export const calculateResultMoneyAsync = (shiftId) => {
  return async (dispatch) => {
    try {
      dispatch(calculateResultMoneyPending());
      let result = {
        cashbox: 0,
        income: 0
      };
      
      const cashboxPromise = axiosInstance.get(`/cashbox/getByShiftsId/${shiftId}`);
      const guestsPromise = axiosInstance.get(`/guests/getByShiftsId/${shiftId}`);

      const [ cashboxResponse, guestsResponse ] = await Promise.all([cashboxPromise, guestsPromise]);

      const { cashboxLogsByShiftsId } = cashboxResponse.data;
      const { guestsByShiftsId } = guestsResponse.data;

      for (let elem of cashboxLogsByShiftsId) {
        result.cashbox += +elem.input_cash;
        result.cashbox -= +elem.output_cash;

        result.income += +elem.input_cash;
        result.income += +elem.input_non_cash;
        result.income += +elem.output_cash;
        result.income += +elem.output_non_cash;
      }

      for (let elem of guestsByShiftsId) {
        result.cashbox += +elem.cash;

        result.income += +elem.result_money;
      }

      console.log(cashboxLogsByShiftsId);
      console.log(guestsByShiftsId);

      console.log(result);

      dispatch(calculateResultMoneySuccess(result));
    } catch (error) {
      dispatch(calculateResultMoneyError(error));
    }
  }  
}