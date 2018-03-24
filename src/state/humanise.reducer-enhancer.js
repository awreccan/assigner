import { omit, cloneDeep } from 'lodash'
import { UPDATE_HUMAN_FRIENDLY_STATE } from './actions'

export function humanToReduxFriendlyState(arr) {
  let lists = {}, items = {}

  arr.forEach(l => {
    lists[l.id] = omit(l, 'items')
    l.items.forEach(i => {
      items[i.id] = i
      items[i.id].list = l.id
    })
  })

  const listOrder = arr.map(l => l.id)

  return {
    lists,
    items,
    listOrder
  }
}

function reduxToHumanFriendlyState(obj) {
  const { lists, items, listOrder } = obj
  const array = []
  const listsCopy = cloneDeep(lists)
  Object.values(listsCopy).forEach(l => l.items = [])
  Object.values(items).forEach(item => {
    const parentList = listsCopy[item.list]
    parentList.items.push({...item})
  })
  listOrder.forEach(l => array.push( listsCopy[l] ))
  return array
}

// Example of redux friendly state
//
// const reduxState = {
//   lists: {
//     l1: { id: 'l1', name: 'List 1' } ,
//     l2: { id: 'l2', name: 'List 2' },
//     l3: { id: 'l3', name: 'List 3' },
//     l4: { id: 'l4', name: 'List 4' }
//   },
//   items: {
//     i1: { id: 'i1', name: 'Item 1', list: 'l1' },
//     i2: { id: 'i2', name: 'Item 2', list: 'l1' } ,
//     i3: { id: 'i3', name: 'Item 3', list: 'l2' },
//     i4: { id: 'i4', name: 'Item 4', list: 'l2' },
//     i5: { id: 'i5', name: 'Item 5', list: 'l3' },
//     i6: { id: 'i6', name: 'Item 6', list: 'l3' } ,
//     i7: { id: 'i7', name: 'Item 7', list: 'l4' },
//     i8: { id: 'i8', name: 'Item 8', list: 'l4' }
//   },
//   listOrder: [ 'l2', 'l4', 'l3', 'l1' ]
// }

export function humanFriendlyReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_HUMAN_FRIENDLY_STATE:
      return {
        ...state,
        humanFriendly: reduxToHumanFriendlyState(state)
      }
    default:
      return state
  }
}

const humaniseReducer = reducer => (state, action) => {
  const nextState = reducer(state, action)
  return humanFriendlyReducer(nextState, { type: UPDATE_HUMAN_FRIENDLY_STATE })
}

export default humaniseReducer