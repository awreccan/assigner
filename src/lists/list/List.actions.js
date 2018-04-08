import { RENAME_LIST } from '../../state/actions'

export function renameList(listId, name) {
  return {
    type: RENAME_LIST,
    listId,
    name
  }
}