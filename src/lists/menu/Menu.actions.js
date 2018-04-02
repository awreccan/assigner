import { SHOW_MENU, HIDE_MENU } from '../../state/actions'

export function showMenu(listId) {
  return {
    type: SHOW_MENU,
    listId
  }
}

export function hideMenu(listId) {
  return {
    type: HIDE_MENU,
    listId
  }
}