import React, { Component } from 'react'
import MuuriGridItem from '../muuri/MuuriGridItem'
import Muuri from 'muuri'
import Item from './item/Item'
import './List.css'

export default class List extends Component {
  componentDidMount() {
    new Muuri(`.list-${this.props.index} .items.muuri-grid`)
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