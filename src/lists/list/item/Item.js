import React from 'react'
import MuuriGridItem from '../../muuri/MuuriGridItem'
import './Item.css'

export default function Item(props) {
  return (
    <MuuriGridItem className='item'>Item { props.index }</MuuriGridItem>
  )
}