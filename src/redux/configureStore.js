import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './form';
//applyMiddleware return enhancer
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions:Promotions,
      leaders: Leaders,
        user: Auth,
      ...createForms({
        feedback:InitialFeedback
      })
    }),
    applyMiddleware(thunk, logger)
  )
  return store;
}
