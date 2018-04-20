import React from 'react'
import MuuriGridItem from '../../muuri/MuuriGridItem'
import './Item.css'

export default function Item(props) {
  return (
    <MuuriGridItem className={`item item-${props.item.id}`}>
      <span className='item-name'>{ props.item.name }</span>
    </MuuriGridItem>
  )
}