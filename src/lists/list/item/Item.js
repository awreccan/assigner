import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renameItem } from './Item.actions'
import MuuriGridItem from '../../muuri/MuuriGridItem'
import './Item.css'

class Item extends Component {
  rename = () => {
    const { item, renameItem } = this.props
    const newName = prompt('Enter a new item name', item.name)
    if (newName && newName !== item.name) {
      renameItem(item.id, newName)
    }
  }

  render () {
    return (
      <MuuriGridItem className={`item item-${this.props.item.id}`}>
        <span className='item-name' onClick={this.rename}>
          {this.props.item.name}
        </span>
      </MuuriGridItem>
    )
  }
}

export default connect(null, { renameItem })(Item)
