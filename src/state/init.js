import { createStore, applyMiddleware, compose } from 'redux'
import { lists } from '../mocks/4-lists-8-items'
import { createLogger } from 'redux-logger'
import humaniseReducer, { humanToReduxFriendlyState } from './humanise.reducer-enhancer'
import { neverLogThese, logTheseInDev } from './actions'

import ReplaceableMiddleware from 'redux-replaceable-middleware'
export const replaceableMiddleware = ReplaceableMiddleware();

export function initStore(reducer) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const initialState = humanToReduxFriendlyState(lists)

  const store = createStore(
    humaniseReducer(reducer),
    initialState,
    composeEnhancers(applyMiddleware(replaceableMiddleware))
  )

  const pulse = () => setTimeout(() => {
    store.dispatch({ type: 'REDUX_LOGGER_TEST' })
    pulse()
  }, 1000)

  pulse()

  return store
}

export function installDemoLogger() {
  replaceableMiddleware.replaceBy(demoLogger)
}

export function installDevLogger() {
  replaceableMiddleware.replaceBy(devLogger)
}

const demoLogger = createLogger({
  predicate: (_, action) => ![].concat(neverLogThese, logTheseInDev).includes(action.type),
  stateTransformer: state => state.humanFriendly,
  diff: true
})

const devLogger = createLogger({
  predicate: (_, action) => !neverLogThese.includes(action.type),
  // stateTransformer: state => state.humanFriendly,
})
