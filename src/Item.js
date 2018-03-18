import React from 'react'
import MuuriGridItem from './MuuriGridItem'
import './Item.css'

export default function Item(props) {
  return (
    <MuuriGridItem className='item'>Item { props.index }</MuuriGridItem>
  )
}