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
import { sortGuests } from '../../utils/utils';

const initialState = {
  error: null,
  guests: [],
  currentGuest: {},
  isLoading: false,
  searchInput: '',
  showPaymentModal: false,
  showAddGroupModal: false,
  showAddGuestModal: false,
  showPaymentGroupModal: false,
  currentGroup: [],
}

export const guestsReducer = (state = initialState, action) => {
  switch (action.type) {
    // ------------------------------------------------------------------ GET_ALL_GUESTS
    case GET_ALL_GUESTS_PENDING:
      return {...state, isLoading: true}
    case GET_ALL_GUESTS_SUCCESS:
      return {...state, isLoading: false, guests: sortGuests(action.payload)}
    case GET_ALL_GUESTS_ERROR:
      return {...state, isLoading: false, error: action.payload}

    // ----------------------------------------------------------- GET_GUESTS_BY_SHIFTS_ID
    case GET_GUESTS_BY_SHIFTS_ID_PENDING:
      return {...state, isLoading: true}
    case GET_GUESTS_BY_SHIFTS_ID_SUCCESS:
      return {...state, isLoading: false, guests: sortGuests(action.payload)}
    case GET_GUESTS_BY_SHIFTS_ID_ERROR:
      return {...state, isLoading: false, error: action.payload}

    // ------------------------------------------------------------------------ GET_GUESTS
    case ADD_GUEST_PENDING:
      return {...state, isLoading: true}
    case ADD_GUEST_SUCCESS:
      return {...state, isLoading: false, guests: sortGuests([...state.guests, action.payload])}
    case ADD_GUEST_ERROR:
      return {...state, isLoading: false, error: action.payload}

    // ------------------------------------------------------------------------- ADD_GROUP
    case ADD_GROUP_PENDING:
      return {...state, isLoading: true}
    case ADD_GROUP_SUCCESS:
      return {...state, isLoading: false, guests: sortGuests([...state.guests, ...action.payload])}
    case ADD_GROUP_ERROR:
      return {...state, isLoading: false, error: action.payload}

    // ------------------------------------------------------------------------- EDIT_GUEST
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

    // ------------------------------------------------------------------------- CALCULATE_MONEY
    case CALCULATE_MONEY_PENDING:
      return {...state, isLoading: true}
    case CALCULATE_MONEY_SUCCESS:               //****************** 2023-06-07 */
      let calculatedGuests = [...state.guests];
      for (let i = 0; i < state.guests.length; i++) {
        if (state.guests[i].id === action.payload.id) {
          calculatedGuests[i] = {...action.payload.guest};
        }
      }
      return {...state, isLoading: false, guests: sortGuests(calculatedGuests), currentGuest: action.payload.guest, showPaymentModal: true}
    case CALCULATE_MONEY_ERROR:
        return {...state, isLoading: false, error: action.payload}

    // ------------------------------------------------------------------------- NOT_SHOW_PAYMENT_MODAL
    case NOT_SHOW_PAYMENT_MODAL:
      let arrGuests = [...state.guests];
      for (let i = 0; i < state.guests.length; i++) {
        if (state.guests[i].id === action.payload.id) {
          arrGuests[i] = {...arrGuests[i], ...action.payload.options};
        }
      }
      return {...state, guests: sortGuests(arrGuests), showPaymentModal: false}

    // ------------------------------------------------------------------------- CALCULATE_BREAK
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

    // ------------------------------------------------------------------------- CHANGE_SEARCH_INPUT
    case CHANGE_SEARCH_INPUT_SUCCESS:
      return {...state, searchInput: action.payload}
    case CHANGE_SEARCH_INPUT_ERROR:
        return {...state, error: action.payload}

    // ------------------------------------------------------------------------- TOGGLE_SHOW_ADD_GROUP_MODAL
    case TOGGLE_SHOW_ADD_GROUP_MODAL_SUCCESS:
      return {...state, showAddGroupModal: !state.showAddGroupModal}
    case TOGGLE_SHOW_ADD_GROUP_MODAL_ERROR:
        return {...state, error: action.payload}

    // ------------------------------------------------------------------------- TOGGLE_SHOW_ADD_GUEST_MODAL
    case TOGGLE_SHOW_ADD_GUEST_MODAL_SUCCESS:
      return {...state, showAddGuestModal: !state.showAddGuestModal}
    case TOGGLE_SHOW_ADD_GUEST_MODAL_ERROR:
        return {...state, error: action.payload}

    // ------------------------------------------------------------------------- TOGGLE_SHOW_PAYMENT_GROUP_MODAL
    case TOGGLE_SHOW_PAYMENT_GROUP_MODAL_SUCCESS:
      return {...state, showPaymentGroupModal: !state.showPaymentGroupModal}
    case TOGGLE_SHOW_PAYMENT_GROUP_MODAL_ERROR:
      return {...state, error: action.payload}

    // ------------------------------------------------------------------------- SET_CURRENT_GROUP
    case SET_CURRENT_GROUP_PENDING:
      return {...state, isLoading: true}
    case SET_CURRENT_GROUP_SUCCESS:
      return {...state, isLoading: false, currentGroup: sortGuests(action.payload)}
    case SET_CURRENT_GROUP_ERROR:
      return {...state, isLoading: false, error: action.payload}

    default: return state;
  }
}