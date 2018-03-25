import { DRAG_ITEM, DROP_ITEM } from '../../../state/actions'

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