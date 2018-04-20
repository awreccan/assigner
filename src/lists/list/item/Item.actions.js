import { DRAG_ITEM, DROP_ITEM, RENAME_ITEM } from '../../../state/actions'

export function dragItem(fromList, fromIndex) {
  return {
    type: 'clientToServer/' + DRAG_ITEM,
    fromList,
    fromIndex
  }
}

export function dropItem(toList, toIndex) {
  return {
    type: 'clientToServer/' + DROP_ITEM,
    toList,
    toIndex
  }
}

export function renameItem(itemId, name) {
  return {
    type: 'clientToServer/' + RENAME_ITEM,
    itemId,
    name
  }
}