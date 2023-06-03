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
} from './guestsActionTypes';
import { sortGuests } from '../../utils/utils';

const initialState = {
  guests: [],
  currentGuest: {},
  isLoading: false,
  error: null,
  showPaymentModal: false,
  showAddGroupModal: false,
  searchInput: '',
}

export const guestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GUESTS_PENDING:
      return {...state, isLoading: true}
    
    case GET_ALL_GUESTS_SUCCESS:
      return {...state, isLoading: false, guests: sortGuests(action.payload)}

    case GET_ALL_GUESTS_ERROR:
      return {...state, isLoading: false, error: action.payload}



    case GET_GUESTS_BY_SHIFTS_ID_PENDING:
      return {...state, isLoading: true}
    
    case GET_GUESTS_BY_SHIFTS_ID_SUCCESS:
      return {...state, isLoading: false, guests: sortGuests(action.payload)}

    case GET_GUESTS_BY_SHIFTS_ID_ERROR:
      return {...state, isLoading: false, error: action.payload}



    case ADD_GUEST_PENDING:
      return {...state, isLoading: true}
    
    case ADD_GUEST_SUCCESS:
      return {...state, isLoading: false, guests: sortGuests([...state.guests, action.payload])}

    case ADD_GUEST_ERROR:
      return {...state, isLoading: false, error: action.payload}



    case ADD_GROUP_PENDING:
      return {...state, isLoading: true}
    
    case ADD_GROUP_SUCCESS:
      return {...state, isLoading: false, guests: sortGuests([...state.guests, ...action.payload])}

    case ADD_GROUP_ERROR:
      return {...state, isLoading: false, error: action.payload}



    case EDIT_GUEST_PENDING:
      return {...state, isLoading: true}
    
    case EDIT_GUEST_SUCCESS:
      let editedGuests = [...state.guests];
      for (let i = 0; i < state.guests.length; i++) {
        if (state.guests[i].id === action.payload.id) {
          editedGuests[i] = {...action.payload.guest};
        }
      }

      return {...state, isLoading: false, guests: sortGuests(editedGuests), currentGuest: {}, showPaymentModal: false}

    case EDIT_GUEST_ERROR:
      return {...state, isLoading: false, error: action.payload, showPaymentModal: false}



    case CALCULATE_MONEY_PENDING:
      return {...state, isLoading: true}
    
    case CALCULATE_MONEY_SUCCESS:
      let calculatedGuests = [...state.guests];
      for (let i = 0; i < state.guests.length; i++) {
        if (state.guests[i].id === action.payload.id) {
          calculatedGuests[i] = {...action.payload.guest};
        }
      }

      return {...state, isLoading: false, guests: sortGuests(calculatedGuests), currentGuest: action.payload.guest, showPaymentModal: true}

    case CALCULATE_MONEY_ERROR:
        return {...state, isLoading: false, error: action.payload}



    case CALCULATE_BREAK_PENDING:
      return {...state, isLoading: true}
    
    case CALCULATE_BREAK_SUCCESS:
      let breakGuests = [...state.guests];
      for (let i = 0; i < state.guests.length; i++) {
        if (state.guests[i].id === action.payload.id) {
          breakGuests[i] = {...action.payload.guest};
        }
      }
      return {...state, isLoading: false, guests: sortGuests(breakGuests)}

    case CALCULATE_BREAK_ERROR:
        return {...state, isLoading: false, error: action.payload}


    
    case CHANGE_SEARCH_INPUT_SUCCESS:
      return {...state, searchInput: action.payload}

    case CHANGE_SEARCH_INPUT_ERROR:
        return {...state, error: action.payload}



    case TOGGLE_SHOW_ADD_GROUP_MODAL_SUCCESS:
      return {...state, showAddGroupModal: !state.showAddGroupModal}

    case TOGGLE_SHOW_ADD_GROUP_MODAL_ERROR:
        return {...state, error: action.payload}



    default: return state;
  }
}