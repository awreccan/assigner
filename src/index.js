import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './lists/Lists.reducer'

import Muuri from 'muuri'

export const MUURI_DRAGGABLE_ITEM = 'MUURI-DRAGGABLE-ITEM'
Muuri.defaultOptions = {
  ...Muuri.defaultOptions,
  dragSortInterval: 0,
  dragEnabled: true,
  itemClass: MUURI_DRAGGABLE_ITEM
}

const store = createStore(reducer)

ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
)

registerServiceWorker();
