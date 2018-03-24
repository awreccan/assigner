import { SET_LISTS_GRID, LAYOUT_LISTS_GRID } from '../../../state/actions'

export function setListsGrid(listsGrid) {
  return {
    type: SET_LISTS_GRID,
    listsGrid
  }
}

export function layoutListsGrid() {
  return {
    type: LAYOUT_LISTS_GRID
  }
}