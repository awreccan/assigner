import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setItemsGrid } from '../muuri/list/item/ItemsGrid.actions'
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
      const { list, listsGrid, setItemsGrid } = this.props
      const self = this
      this.muuriGridOfItems = new Muuri(`.list-${list.id} .items.muuri-grid`, {
        dragSort: () => self.getItemsGrids(),
        dragContainer: listsGrid.getElement()
      })
        .on('dragInit', function (item) {
          item.getElement().style.width = item.getWidth() + 'px';
        })
        .on('dragReleaseEnd', function (item) {
          item.getElement().style.width = '';
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
  function mapStateToProps({ humanFriendly, grids }, { list }) {
    return {
      items: humanFriendly.find(l => l.id === list.id).items,
      listsGrid: grids.lists,
      itemsGrids: grids.items
    }
  },
  { setItemsGrid, layoutListsGrid }
)(List)