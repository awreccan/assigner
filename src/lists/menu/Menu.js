import React, { Component } from 'react'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import { connect } from 'react-redux'
import { showMenu, hideMenu } from './Menu.actions'
import './Dropdown.css'
import './Menu.css'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: ['Message', 'Schedule meeting']
    }

    switch(props.list.type) {
      case 'ux':
        this.state.options.unshift(['Latest design activity'])
        break;
      case 'dev':
        this.state.options.unshift(['Latest commits'])
        break;
      default:
        break;
    }
  }

  onShow() {
    this.props.showMenu(this.props.list.id)
  }

  onHide() {
    this.props.hideMenu(this.props.list.id)
  }

  render () {
    return (
      <Dropdown hideOnMouseDown
        className='menu'
        onShow={this.onShow}
        onHide={this.onHide}>
        <DropdownTrigger>
          v
        </DropdownTrigger>
        <DropdownContent>
          <ul>
            { this.state.options.map(o =>
              <li key={o}>{o}</li>
            ) }
          </ul>
        </DropdownContent>
      </Dropdown>
    )
  }
}

export default connect(null, { showMenu, hideMenu })(Menu)
