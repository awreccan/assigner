import { DRAG_ITEM, DROP_ITEM, RENAME_ITEM } from '../../../state/actions'
import _ from 'lodash'

export default function reducer(items = {}, action) {
  switch (action.type) {

    // Applies a `dragging` tag on the item being dragged
    case 'clientToServer/' + DRAG_ITEM:
    case 'serverToClient/' + DRAG_ITEM:
      const { fromList, fromIndex } = action

      const draggedItemId = Object.values(items)
        .find(i => i.list === fromList && i.index === fromIndex)
        .id

      return {
        ...items,
        [draggedItemId]: {
          ...items[ draggedItemId ],
          dragging: true
        }
      }

    // Changes indices of affected items
    case 'clientToServer/' + DROP_ITEM:
    case 'serverToClient/' + DROP_ITEM:
      const { toList, toIndex } = action

      const droppedItem = Object.values(items).find(i => i.dragging)

      const otherItemsWithNewIndices = getOtherItemsWithNewIndices(items, action, droppedItem)

      return {
        ...items,
        ...otherItemsWithNewIndices,
        [droppedItem.id]: {
          ...items[droppedItem.id],
          list: toList,
          index: toIndex,
          dragging: false
        }
      }

    case 'clientToServer/' + RENAME_ITEM:
    case 'serverToClient/' + RENAME_ITEM:
      const { itemId, name } = action
      return {
        ...items,
        [itemId]: {
          ...items[itemId],
          name
        }
      }

    default:
      return items;
  }
}

const getOtherItemsWithNewIndices = function (items, { toList, toIndex }, droppedItem) {
  const otherItemsWithNewIndices = {}

  let toListRangeStart, toListRangeEnd, toListIndexChanger
  let fromListRangeStart, fromListRangeEnd, fromListIndexChanger
  const increment = x => x + 1, decrement = x => x - 1

  // default values will cause nothing to be added to otherItemsWithNewIndices object
  toListRangeStart = toListRangeEnd = fromListRangeStart = fromListRangeEnd = -1

  if (toList === droppedItem.list) { // same list
    if (toIndex < droppedItem.index) {
      // moved up
      fromListRangeStart = toIndex
      fromListRangeEnd = droppedItem.index
      fromListIndexChanger = increment
    } else if (toIndex > droppedItem.index) {
      // moved down
      fromListRangeStart = droppedItem.index + 1
      fromListRangeEnd = toIndex + 1
      fromListIndexChanger = decrement
    }
    // implicit else: do nothing if dropped in same place
  } else { // different list

    // we want the ranges to run through the end of the list.
    // so *ListRangeEnd can be the *List length or greater.
    // items length is guaranteed to be >= any list's length,
    // *and* is cheaper to compute, so we pre-compute it
    const numItemsPlus1 = Object.keys(items).length + 1

    // fromList
    fromListRangeStart = droppedItem.index + 1
    fromListRangeEnd = numItemsPlus1
    fromListIndexChanger = decrement

    // to list
    toListRangeStart = toIndex
    toListRangeEnd = numItemsPlus1
    toListIndexChanger = increment
  }

  Object.values(items).forEach(item => {
    if (item.list === droppedItem.list && _.inRange(item.index, fromListRangeStart, fromListRangeEnd)) {
      // same list
      otherItemsWithNewIndices[ item.id ] = {
        ...item,
        index: fromListIndexChanger(item.index)
      }
    } else if (item.list === toList && _.inRange(item.index, toListRangeStart, toListRangeEnd)) {
      // different list
      otherItemsWithNewIndices[ item.id ] = {
        ...item,
        index: toListIndexChanger(item.index)
      }
    }
  })
  return otherItemsWithNewIndices
}
