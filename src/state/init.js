import { createStore, applyMiddleware, compose } from 'redux'
import { lists } from '../mocks/4-lists-8-items'
import { createLogger } from 'redux-logger'
import humaniseReducer, { humanToReduxFriendlyState } from './humanise.reducer-enhancer'
import * as socketActions from './actions/socket'
import * as neverLogTheseActions from './actions/infra'
import * as logTheseActionsOnlyInDev from './actions/dev'

import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

import ReplaceableMiddleware from 'redux-replaceable-middleware'
export const replaceableMiddleware = ReplaceableMiddleware();

let socket = io('http://localhost:8000')
let socketIoMiddleware = createSocketIoMiddleware(socket,
    type => Object.keys(socketActions).includes(type.split('clientToServer/')[1]));

export function initStore(reducer) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const initialState = humanToReduxFriendlyState(lists)

  const store = createStore(
    humaniseReducer(reducer),
    initialState,
    composeEnhancers(applyMiddleware(socketIoMiddleware, replaceableMiddleware))
  )

  // const pulse = () => setTimeout(() => {
  //   store.dispatch({ type: 'REDUX_LOGGER_TEST' })
  //   pulse()
  // }, 1000)
  //
  // pulse()

  return store
}

export function installDemoLogger() {
  replaceableMiddleware.replaceBy(demoLogger)
}

export function installDevLogger() {
  replaceableMiddleware.replaceBy(devLogger)
}

const demoLogger = createLogger({
  predicate: (_, action) => ![].concat(
    Object.keys(neverLogTheseActions),
    Object.keys(logTheseActionsOnlyInDev)
  ).includes(action.type),
  stateTransformer: state => state.humanFriendly,
  diff: true
})

const devLogger = createLogger({
  predicate: (_, action) => !Object.keys(neverLogTheseActions).includes(action.type),
  // stateTransformer: state => state.humanFriendly,
})
