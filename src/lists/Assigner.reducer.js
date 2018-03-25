import { combineReducers } from 'redux'
import itemsGrid from './muuri/list/item/ItemsGrid.reducer'
import listsGrid from './muuri/list/ListsGrid.reducer'
import itemReducer from './list/item/Item.reducer'

const noopReducer = initialState => (state = initialState) => state

const reducers = {
  lists: noopReducer({}),
  items: itemReducer,
  listOrder: noopReducer([]),
  grids: combineReducers({
    lists: listsGrid,
    items: itemsGrid
  }),
  humanFriendly: noopReducer([])
}

export default combineReducers(reducers)