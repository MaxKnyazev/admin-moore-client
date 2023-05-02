import { 
  GET_ALL_CASHBOX_LOGS_PENDING, GET_ALL_CASHBOX_LOGS_SUCCESS, GET_ALL_CASHBOX_LOGS_ERROR, 
  ADD_CASHBOX_LOG_PENDING, ADD_CASHBOX_LOG_SUCCESS, ADD_CASHBOX_LOG_ERROR,
} from './cashboxLogsActionTypes';
// import { sortGuests } from '../../utils/utils';

const initialState = {
  cashboxLogs: [],
  isLoading: false,
  error: null,
  // showModal: false,
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



    // case EDIT_GUEST_PENDING:
    //   return {...state, isLoading: true}
    
    // case EDIT_GUEST_SUCCESS:
    //   let editedGuests = [...state.guests];
    //   for (let i = 0; i < state.guests.length; i++) {
    //     if (state.guests[i].id === action.payload.id) {
    //       editedGuests[i] = {...action.payload.guest};
    //     }
    //   }

    //   return {...state, isLoading: false, guests: sortGuests(editedGuests), currentGuest: {}, showModal: false}

    // case EDIT_GUEST_ERROR:
    //   return {...state, isLoading: false, error: action.payload, showModal: false}



    default: return state;
  }
}