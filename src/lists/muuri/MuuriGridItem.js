import React, { Component } from 'react'
import './Muuri.css'

export default class MuuriGridItem extends Component {
  render() {
    return (
      <div {...this.props} ref={r => this.props.setRef(r)}>
        <div className='muuri-item-content'>
          { this.props.children }
        </div>
      </div>
    )
  }
}