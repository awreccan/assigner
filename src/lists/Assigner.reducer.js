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

export default combineReducers({ lists })