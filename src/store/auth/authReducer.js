import { 
  SET_USER_PENDING, SET_USER_SUCCESS, SET_USER_ERROR,
} from './authActionTypes';

const initialState = {
  user: {
    id: '774f3db8-e666-4dac-90cb-0e92373cbc36',
    login: 'testLogin',
    name: 'testName',
    status: 'admin',
  },
  isLoading: false,
  error: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PENDING:
      return {...state, isLoading: true}
    
    case SET_USER_SUCCESS:
      return {...state, isLoading: false, user: action.payload}

    case SET_USER_ERROR:
      return {...state, isLoading: false, error: action.payload}

    default: return state;
  }
}