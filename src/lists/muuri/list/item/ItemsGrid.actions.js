import { SET_ITEMS_GRID } from '../../../../state/actions'

export function setItemsGrid(itemsGrid, listId) {
  return {
    type: SET_ITEMS_GRID,
    itemsGrid,
    listId
  }
}