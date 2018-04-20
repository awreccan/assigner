import { DRAG_ITEM, DROP_ITEM, RENAME_ITEM } from '../../../state/actions'

export function dragItem(fromList, fromIndex) {
  return {
    type: DRAG_ITEM,
    fromList,
    fromIndex
  }
}

export function dropItem(toList, toIndex) {
  return {
    type: DROP_ITEM,
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