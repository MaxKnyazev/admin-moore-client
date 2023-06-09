import { 
  SET_CURRENT_SHIFT_PENDING, SET_CURRENT_SHIFT_SUCCESS, SET_CURRENT_SHIFT_ERROR,
  CALCULATE_RESULT_MONEY_PENDING, CALCULATE_RESULT_MONEY_SUCCESS, CALCULATE_RESULT_MONEY_ERROR,
} from './shiftsActionTypes';

const initialState = {
  currentShift: {
    id: 'ff8ce162-537a-4b9e-8e78-d0aac137fa18',
    usersId: '774f3db8-e666-4dac-90cb-0e92373cbc36',
    usersName: 'testName',
    status: 'admin',
  },
  cashbox: 0,
  income: 0,
  isLoading: false,
  error: null,
}

export const shiftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SHIFT_PENDING:
      return {...state, isLoading: true}
    
    case SET_CURRENT_SHIFT_SUCCESS:
      return {...state, isLoading: false, currentShift: action.payload}

    case SET_CURRENT_SHIFT_ERROR:
      return {...state, isLoading: false, error: action.payload}



    case CALCULATE_RESULT_MONEY_PENDING:
      return {...state, isLoading: true}
    
    case CALCULATE_RESULT_MONEY_SUCCESS:
      return {...state, isLoading: false, cashbox: action.payload.cashbox, income: action.payload.income}

    case CALCULATE_RESULT_MONEY_ERROR:
      return {...state, isLoading: false, error: action.payload}

    default: return state;
  }
}