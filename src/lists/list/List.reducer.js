export default function reducer(state = [], action) {
  switch (action.type) {

    case 'SET_ITEMS_GRID':
      const { itemsGrid, listIndex } = action

      const frontSlice = state.slice(0, listIndex)
      const modifiedList = {
        ...state[listIndex],
        itemsGrid
      }
      const backSlice = state.slice(listIndex + 1)

      return [
        ...frontSlice,
        modifiedList,
        ...backSlice
      ]

    default:
      return state;
  }
}