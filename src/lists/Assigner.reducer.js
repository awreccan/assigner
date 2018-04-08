import { combineReducers } from 'redux'
import itemsGrid from './muuri/list/item/ItemsGrid.reducer'
import listsGrid from './muuri/list/ListsGrid.reducer'
import itemReducer from './list/item/Item.reducer'
import listReducer from './list/List.reducer'
import serverUpdateReducer from '../App.reducer'

const noopReducer = initialState => (state = initialState) => state

const reducers = {
  lists: listReducer,
  items: itemReducer,
  listOrder: noopReducer([]),
  serverUpdate: serverUpdateReducer,
  grids: combineReducers({
    lists: listsGrid,
    items: itemsGrid
  }),
  humanFriendly: noopReducer([])
}

export default combineReducers(reducers)