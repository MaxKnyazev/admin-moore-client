import { 
  GET_ALL_GUESTS_PENDING, GET_ALL_GUESTS_SUCCESS, GET_ALL_GUESTS_ERROR,
  ADD_GUEST_PENDING, ADD_GUEST_SUCCESS, ADD_GUEST_ERROR,
  EDIT_GUEST_PENDING, EDIT_GUEST_SUCCESS, EDIT_GUEST_ERROR,
  CALCULATE_MONEY_PENDING, CALCULATE_MONEY_SUCCESS, CALCULATE_MONEY_ERROR,
  CALCULATE_BREAK_PENDING, CALCULATE_BREAK_SUCCESS, CALCULATE_BREAK_ERROR,
} from './guestsActionTypes';

const initialState = {
  guests: [],
  currentGuest: {},
  isLoading: false,
  error: null,
}

export const guestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GUESTS_PENDING:
      return {...state, isLoading: true}
    
    case GET_ALL_GUESTS_SUCCESS:
      return {...state, isLoading: false, guests: action.payload}

    case GET_ALL_GUESTS_ERROR:
      return {...state, isLoading: false, error: action.payload}



    case ADD_GUEST_PENDING:
      return {...state, isLoading: true}
    
    case ADD_GUEST_SUCCESS:
      return {...state, isLoading: false, guests: [...state.guests, action.payload]}

    case ADD_GUEST_ERROR:
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

      return {...state, isLoading: false, guests: editedGuests, currentGuest: {}}

    case EDIT_GUEST_ERROR:
      return {...state, isLoading: false, error: action.payload}



    case CALCULATE_MONEY_PENDING:
      return {...state, isLoading: true}
    
    case CALCULATE_MONEY_SUCCESS:
      let calculatedGuests = [...state.guests];
      for (let i = 0; i < state.guests.length; i++) {
        if (state.guests[i].id === action.payload.id) {
          calculatedGuests[i] = {...action.payload.guest};
        }
      }

      return {...state, isLoading: false, guests: calculatedGuests, currentGuest: action.payload.guest}

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
      return {...state, isLoading: false, guests: breakGuests}

    case CALCULATE_BREAK_ERROR:
        return {...state, isLoading: false, error: action.payload}

    default: return state;
  }
}