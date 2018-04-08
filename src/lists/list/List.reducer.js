import { RENAME_LIST } from '../../state/actions'

export default function reducer(lists = {}, action) {
  switch (action.type) {

    case RENAME_LIST:
      const { listId, name } = action
      return {
        ...lists,
        [listId]: {
          ...lists[listId],
          name
        }
      }

    default:
      return lists
  }
}