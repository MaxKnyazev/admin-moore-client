import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { guestsReducer } from './guests/guestsReducer';

const rootReducer = combineReducers({
  guestsReducer,
})

export const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);