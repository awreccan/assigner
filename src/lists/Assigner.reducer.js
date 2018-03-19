import { combineReducers } from 'redux'
import lists from './list/List.reducer'

export const initialState = {
  lists: [
    { numItems: 2 },
    { numItems: 3 },
    { numItems: 4 },
    { numItems: 5 }
  ]
}

function listsGrid(state = null, action) {
  switch(action.type) {

    case 'SET_LISTS_GRID':
      const { listsGrid } = action
      return listsGrid

    case 'LAYOUT_LISTS_GRID':
      state && state.refreshItems().layout()
      return state;


    default:
      return state
  }
}

export default combineReducers({ lists, listsGrid })