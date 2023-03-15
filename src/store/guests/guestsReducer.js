import { 
  GET_ALL_GUESTS_PENDING, GET_ALL_GUESTS_SUCCESS, GET_ALL_GUESTS_ERROR, 
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

    default: return state;
  }
}