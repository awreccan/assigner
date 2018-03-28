import React, { Component } from 'react'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import './Dropdown.css'
import './Menu.css'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: ['Message', 'Schedule meeting']
    }

    switch(props.type) {
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

  render () {
    return (
      <Dropdown hideOnMouseDown
        className='menu'>
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

export default Menu
