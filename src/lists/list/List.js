import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setItemsGrid } from '../muuri/list/item/ItemsGrid.actions'
import { dragItem, dropItem } from './item/Item.actions'
import { renameList } from './List.actions'
import { layoutListsGrid } from '../muuri/list/ListsGrid.actions'
import MuuriGridItem from '../muuri/MuuriGridItem'
import Muuri from 'muuri'
import Item from './item/Item'
import './List.css'

class List extends Component {
  componentWillReceiveProps(nextProps) {
    const { itemsGrids } = nextProps
    this.itemsGrids = itemsGrids
  }

  getItemsGrids() {
    return this.itemsGrids && Object.values(this.itemsGrids)
  }

  toIndex = -1

  componentDidUpdate(prevProps) {
    const { list, listsGrid, setItemsGrid, dragItem, dropItem, itemBeingDragged } = this.props

    if (!prevProps.listsGrid && listsGrid) {
      const self = this
      this.muuriGridOfItems = new Muuri(`.list-${list.id} .items.muuri-grid`, {
        dragSort: () => self.getItemsGrids(),
        dragContainer: listsGrid.getElement(),
        dragStartPredicate: function (item, event) {
          if (event.target.classList.contains('item-name')) { return false; }
          return Muuri.ItemDrag.defaultStartPredicate(item, event, {distance: 0, delay: 0, handle: false});
        }
      })
        .on('dragInit', item => {
          item.getElement().style.width = item.getWidth() + 'px';
          const fromIndex = this.muuriGridOfItems.getItems().indexOf(item)
          const fromList = list.id
          this.dragged = true
          dragItem(fromList, fromIndex)
        })
        .on('dragReleaseEnd', item => {
          item.getElement().style.width = '';
          this.toIndex = this.muuriGridOfItems.getItems().indexOf(item)
          const toList = list.id
          this.dropped = true
          dropItem(toList, this.toIndex) // causes React to render a new (undraggable) node for the dropped item
        })
        .on('receive', () => setTimeout(() => this.props.layoutListsGrid(), 0))
      setItemsGrid(this.muuriGridOfItems, list.id)
    }

    if (!prevProps.itemBeingDragged && itemBeingDragged && itemBeingDragged.list === this.props.list.id && !this.dragged) { // on drag
      if (this.dragged) { // on this client
        this.muuriGridOfItems.refreshItems().layout()
        this.dragged = false
      } else { // on other clients
        this.muuriGridOfItems.remove(itemBeingDragged.index)
        this.props.layoutListsGrid()
      }
    }

    if (prevProps.itemBeingDragged && !itemBeingDragged) { // on drop
      if (this.dropped && this.toIndex > -1) {
        this.muuriGridOfItems.remove(this.toIndex, {
          removeElements: true
        })
      }
      const indexOfDroppedItemInTargetList = this.props.items.map(i => i.id).findIndex(i => i === prevProps.itemBeingDragged.id)
      if (indexOfDroppedItemInTargetList > -1) {
        this.muuriGridOfItems.add(this.itemRefs[indexOfDroppedItemInTargetList], {
          index: indexOfDroppedItemInTargetList
        })
        this.props.layoutListsGrid()
        this.dropped = false
      }
    }
  }

  componentWillUnmount() {
    this.muuriGridOfItems.destroy()
  }

  rename = () => {
    const { list, renameList } = this.props
    const newName = prompt('Enter a new list name', list.name)
    if (newName && newName !== list.name) {
      renameList(list.id, newName)
    }
  }

  render() {
    const { items, list, listsGrid } = this.props

    if (listsGrid) { this.itemRefs = {} }

    return (
      <MuuriGridItem className={`list list-${list.id}`}>

        <ListHeader listName={list.name} rename={this.rename} />

        { listsGrid && <div className='items muuri-grid'>

            { items.map((i, index) =>
              <Item key={i.id} item={i} setRef={r => this.itemRefs[index] = r} />
            ) }

        </div> }

      </MuuriGridItem>
    )
  }
}

function ListHeader(props) {
  const { listName, rename } = props
  return (
    <div className='drag-handle'>
      <span className='list-name' onClick={rename}>
        {listName}
      </span>
    </div>
  )
}

export default connect(
  function mapStateToProps({ humanFriendly: lists, items, grids }, { list }) {
    return {
      items: lists.find(l => l.id === list.id).items.filter(i => !i.dragging),
      listsGrid: grids.lists,
      itemsGrids: grids.items,
      itemBeingDragged: Object.values(items).find(i => i.dragging)
    }
  },
  { setItemsGrid, layoutListsGrid, dragItem, dropItem, renameList }
)(List)