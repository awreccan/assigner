import React, { Component } from 'react'
import './Muuri.css'

export default class MuuriGridItem extends Component {
  setRef(r) {
    this.props.setRef && this.props.setRef(r)
  }

  render() {
    const { setRef, ...cleanProps } = this.props
    return (
      <div {...cleanProps} ref={r => this.setRef(r)}>
        <div className='muuri-item-content'>
          { this.props.children }
        </div>
      </div>
    )
  }
}