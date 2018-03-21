import { combineReducers } from 'redux'
import itemsGrid from './muuri/list/item/ItemsGrid.reducer'
import listsGrid from './muuri/list/ListsGrid.reducer'

const noopReducer = initialState => (state = initialState) => state

const reducers = {
  lists: noopReducer({}),
  items: noopReducer({}),
  listOrder: noopReducer([]),
  grids: combineReducers({
    lists: listsGrid,
    items: itemsGrid
  }),
  humanFriendly: noopReducer([])
}

export default combineReducers(reducers)