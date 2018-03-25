import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setItemsGrid } from '../muuri/list/item/ItemsGrid.actions'
import { dragItem, dropItem } from './item/Item.actions'
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

  componentDidUpdate(prevProps) {
    if (!prevProps.listsGrid && this.props.listsGrid) {
      const { list, listsGrid, setItemsGrid, dragItem, dropItem } = this.props
      const self = this
      this.muuriGridOfItems = new Muuri(`.list-${list.id} .items.muuri-grid`, {
        dragSort: () => self.getItemsGrids(),
        dragContainer: listsGrid.getElement()
      })
        .on('dragInit', item => {
          item.getElement().style.width = item.getWidth() + 'px';
          const fromIndex = this.muuriGridOfItems.getItems().indexOf(item)
          const fromList = list.id
          dragItem(fromList, fromIndex)
        })
        .on('dragReleaseEnd', item => {
          item.getElement().style.width = '';
          const toIndex = this.muuriGridOfItems.getItems().indexOf(item)
          const toList = list.id
          dropItem(toList, toIndex) // causes React to render a new (undraggable) node for the dropped item
        })
        .on('receive', () => setTimeout(() => this.props.layoutListsGrid(), 0))
      setItemsGrid(this.muuriGridOfItems, list.id)
    }
  }

  componentWillUnmount() {
    this.muuriGridOfItems.destroy()
  }

  render() {
    const { items, list, listsGrid } = this.props
    return (
      <MuuriGridItem className={`list list-${list.id}`}>
        <div className='drag-handle'>{list.name}</div>
        { listsGrid && (
          <div className='items muuri-grid'>
            { items.map(i => <Item key={i.id} item={i} />) }
          </div>
        ) }
      </MuuriGridItem>
    )
  }
}

export default connect(
  function mapStateToProps({ humanFriendly: lists, grids }, { list }) {
    return {
      items: lists.find(l => l.id === list.id).items.filter(i => !i.dragging),
      listsGrid: grids.lists,
      itemsGrids: grids.items
    }
  },
  { setItemsGrid, layoutListsGrid }
)(List)