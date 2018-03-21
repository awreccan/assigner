import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setItemsGrid } from '../muuri/list/item/ItemsGrid.actions'
import { layoutListsGrid } from '../muuri/list/ListsGrid.actions'
import MuuriGridItem from '../muuri/MuuriGridItem'
import Muuri from 'muuri'
import Item from './item/Item'
import './List.css'

class List extends Component {
  componentDidMount() {
    const { list, setItemsGrid } = this.props
    const itemsGrid = new Muuri(`.list-${list.id} .items.muuri-grid`, {
      dragSort: () => Object.values(this.props.itemsGrids)
    })
      .on('receive', () => setTimeout(() => this.props.layoutListsGrid(), 0))
    setItemsGrid(itemsGrid, list.id)
  }

  render() {
    const { items, list } = this.props
    return (
      <MuuriGridItem className={`list list-${list.id}`}>
        <div className='drag-handle'>{list.name}</div>
        <div className='items muuri-grid'>
          { items.map(i => <Item key={i.id} item={i} />) }
        </div>
      </MuuriGridItem>
    )
  }
}

export default connect(
  function mapStateToProps({ humanFriendly, grids }, { list }) {
    return {
      items: humanFriendly.find(l => l.id === list.id).items,
      itemsGrids: grids.items
    }
  },
  { setItemsGrid, layoutListsGrid }
)(List)