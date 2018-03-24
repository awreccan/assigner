import { SET_ITEMS_GRID } from '../../../../state/actions'

export default function reducer(state = {}, action) {
  switch (action.type) {

    case SET_ITEMS_GRID:
      const { itemsGrid, listId } = action

      return {
        ...state,
        [listId]: itemsGrid
      }

    default:
      return state;
  }
}