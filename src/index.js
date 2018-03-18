import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer, { initialState } from './lists/Assigner.reducer'

import { logger } from 'redux-logger'


import Muuri from 'muuri'

export const MUURI_DRAGGABLE_ITEM = 'MUURI-DRAGGABLE-ITEM'
Muuri.defaultOptions = {
  ...Muuri.defaultOptions,
  dragSortInterval: 0,
  dragEnabled: true,
  itemClass: MUURI_DRAGGABLE_ITEM
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(logger))
)

ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
)

registerServiceWorker();
