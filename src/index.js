import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import Demo from './Demo'
import { Provider } from 'react-redux'
import { initStore } from './state/init'
import reducer from './lists/Assigner.reducer'

import Muuri from 'muuri'

export const MUURI_DRAGGABLE_ITEM = 'MUURI-DRAGGABLE-ITEM'
Muuri.defaultOptions = {
  ...Muuri.defaultOptions,
  dragSortInterval: 0,
  dragEnabled: true,
  itemClass: MUURI_DRAGGABLE_ITEM
}

ReactDOM.render(

  <Demo dev={false}>
    <Provider store={initStore(reducer)}>
      <App />
    </Provider>
  </Demo>,

  document.getElementById('root')
)

registerServiceWorker();
