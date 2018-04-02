import { SHOW_MENU, HIDE_MENU, RENAME_LIST } from '../../state/actions'

export default function reducer(lists = {}, action) {
  switch (action.type) {

    case 'clientToServer/' + RENAME_LIST:
    case 'serverToClient/' + RENAME_LIST:
      const { listId, name } = action
      return {
        ...lists,
        [listId]: {
          ...lists[ listId ],
          name
        }
      }

    case SHOW_MENU:
      return {
        ...lists,
        [action.listId]: {
          ...lists[action.listId],
          menuOpen: true
        }
      }

    case HIDE_MENU:
      return {
        ...lists,
        [action.listId]: {
          ...lists[action.listId],
          menuOpen: false
        }
      }

    default:
      return lists
  }
}