import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { guestsReducer } from './guests/guestsReducer';
import { authReducer } from './auth/authReducer';

const rootReducer = combineReducers({
  guestsReducer,
  authReducer,
})

export const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);