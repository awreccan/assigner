import { RENAME_LIST } from '../../state/actions'

export function renameList(listId, name) {
  return {
    type: 'clientToServer/' + RENAME_LIST,
    listId,
    name
  }
}