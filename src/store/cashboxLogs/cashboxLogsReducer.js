import { 
  GET_ALL_CASHBOX_LOGS_PENDING, GET_ALL_CASHBOX_LOGS_SUCCESS, GET_ALL_CASHBOX_LOGS_ERROR, 
  ADD_CASHBOX_LOG_PENDING, ADD_CASHBOX_LOG_SUCCESS, ADD_CASHBOX_LOG_ERROR,
  TOGGLE_SHOW_CASHBOX_MODAL_SUCCESS, TOGGLE_SHOW_CASHBOX_MODAL_ERROR,
} from './cashboxLogsActionTypes';

const initialState = {
  cashboxLogs: [],
  isLoading: false,
  error: null,
  showCashboxModal: false,
}

export const cashboxLogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CASHBOX_LOGS_PENDING:
      return {...state, isLoading: true}
    
    case GET_ALL_CASHBOX_LOGS_SUCCESS:
      return {...state, isLoading: false, cashboxLogs: action.payload}

    case GET_ALL_CASHBOX_LOGS_ERROR:
      return {...state, isLoading: false, error: action.payload}



    case ADD_CASHBOX_LOG_PENDING:
      return {...state, isLoading: true}
    
    case ADD_CASHBOX_LOG_SUCCESS:
      return {...state, isLoading: false, cashboxLogs: [...state.cashboxLogs, action.payload]}

    case ADD_CASHBOX_LOG_ERROR:
      return {...state, isLoading: false, error: action.payload}



    case TOGGLE_SHOW_CASHBOX_MODAL_SUCCESS:
      return {...state, showCashboxModal: !state.showCashboxModal}
    case TOGGLE_SHOW_CASHBOX_MODAL_ERROR:
        return {...state, error: action.payload}



    default: return state;
  }
}