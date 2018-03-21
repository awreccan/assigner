export default function reducer(state = null, action) {
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