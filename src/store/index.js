import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { guestsReducer } from './guests/guestsReducer';
import { authReducer } from './auth/authReducer';
import { cashboxLogsReducer } from './cashboxLogs/cashboxLogsReducer';
import { shiftsReducer } from './shifts/shiftsReducer';

const rootReducer = combineReducers({
  guestsReducer,
  authReducer,
  cashboxLogsReducer,
  shiftsReducer,
})

export const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);