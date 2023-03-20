import { 
  GET_ALL_GUESTS_PENDING, GET_ALL_GUESTS_SUCCESS, GET_ALL_GUESTS_ERROR,
  ADD_GUEST_PENDING, ADD_GUEST_SUCCESS, ADD_GUEST_ERROR,
  EDIT_GUEST_PENDING, EDIT_GUEST_SUCCESS, EDIT_GUEST_ERROR,
} from './guestsActionTypes';

const initialState = {
  guests: [],
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
      let newGuests = [...state.guests];
      for (let i = 0; i < state.guests.length; i++) {
        if (state.guests[i].id === action.payload.id) {
          newGuests[i] = {...newGuests[i], ...action.payload.options};
        }
      }

      return {...state, isLoading: false, guests: newGuests}

    case EDIT_GUEST_ERROR:
      return {...state, isLoading: false, error: action.payload}

    default: return state;
  }
}