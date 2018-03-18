import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setItemsGrid } from './List.actions.js'
import MuuriGridItem from '../muuri/MuuriGridItem'
import Muuri from 'muuri'
import Item from './item/Item'
import './List.css'

class List extends Component {
  componentDidMount() {
    const { index, setItemsGrid } = this.props
    const itemsGrid = new Muuri(`.list-${index} .items.muuri-grid`, {
      dragSort: () => this.props.itemsGrids
    })
    setItemsGrid(itemsGrid, index)
  }

  render() {
    const { numItems, index } = this.props
    return (
      <MuuriGridItem className={`list list-${index}`}>
        <div className='drag-handle'/>
        <div className='items muuri-grid'>
          {[ ...Array(numItems || 0).keys() ].map(n => (
            <Item key={n} index={n} />
          ))}
        </div>
      </MuuriGridItem>
    )
  }
}

export default connect(
  function mapStateToProps({ lists }) {
    return {
      itemsGrids: lists.map(l => l.itemsGrid)
    }
  },
  { setItemsGrid }
)(List)