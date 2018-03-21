import { combineReducers } from 'redux'
import lists from './list/List.reducer'
import { omit, cloneDeep } from 'lodash'

export const initialState = {
  lists: [
    {
      id: 'l2',
      name: 'List 2',
      items: [
        { id: 'i3', name: 'Item 3' },
        { id: 'i4', name: 'Item 4' }
      ]
    },
    {
      id: 'l4',
      name: 'List 4',
      items: [
        { id: 'i7', name: 'Item 7' },
        { id: 'i8', name: 'Item 8' }
      ]
    },
    {
      id: 'l3',
      name: 'List 3',
      items: [
        { id: 'i5', name: 'Item 5' },
        { id: 'i6', name: 'Item 6' }
      ]
    },
    {
      id: 'l1',
      name: 'List 1',
      items: [
        { id: 'i1', name: 'Item 1' },
        { id: 'i2', name: 'Item 2' }
      ]
    },
  ]
}

function arrayToObjectState(arr) {
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

function objectToArrayState(obj) {
  const { lists, items, listOrder } = obj
  const array = []
  const listsCopy = cloneDeep(lists)
  Object.values(items).forEach(item => {
    const parentList = listsCopy[item.list]
    if (!parentList.items) { parentList.items = [] }
    parentList.items.push({...item})
  })
  listOrder.forEach(l => array.push( listsCopy[l] ))
}

const reduxState = { lists:
  { l2: { id: 'l2', name: 'List 2' },
    l4: { id: 'l4', name: 'List 4' },
    l3: { id: 'l3', name: 'List 3' },
    l1: { id: 'l1', name: 'List 1' } },
  items:
    { i1: { id: 'i1', name: 'Item 1', list: 'l1' },
      i2: { id: 'i2', name: 'Item 2', list: 'l1' } ,
      i3: { id: 'i3', name: 'Item 3', list: 'l2' },
      i4: { id: 'i4', name: 'Item 4', list: 'l2' },
      i7: { id: 'i7', name: 'Item 7', list: 'l4' },
      i8: { id: 'i8', name: 'Item 8', list: 'l4' },
      i5: { id: 'i5', name: 'Item 5', list: 'l3' },
      i6: { id: 'i6', name: 'Item 6', list: 'l3' } },
  listOrder: [ 'l2', 'l4', 'l3', 'l1' ]
}

function listsGrid(state = null, action) {
  switch(action.type) {

    case 'SET_LISTS_GRID':
      const { listsGrid } = action
      return listsGrid

    case 'LAYOUT_LISTS_GRID':
      state && state.refreshItems().layout()
      return state;


    default:
      return state
  }
}

export default combineReducers({ lists, listsGrid })