import { createStore, applyMiddleware, compose } from 'redux'
import { lists } from '../mocks/4-lists-8-items'
import { createLogger } from 'redux-logger'
import humaniseReducer, { humanToReduxFriendlyState } from './humanise.reducer-enhancer'

export function initStore(reducer) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const logger = createLogger({
    predicate: (_, action) => action.type !== 'UPDATE_HUMAN_FRIENDLY_STATE'
  });
  const initialState = humanToReduxFriendlyState(lists)
  return createStore(
    humaniseReducer(reducer),
    initialState,
    composeEnhancers(applyMiddleware(logger))
  )
}