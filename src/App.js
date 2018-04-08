import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Assigner from './lists/Assigner.js'
import { connect } from 'react-redux'
import { toggleOffServerUpdate } from './App.actions'

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.serverUpdate && nextProps.serverUpdate) {
      setTimeout(() => this.props.toggleOffServerUpdate(), 500)
    }
  }

  state = {}

  render() {
    return (
      <div className={`App ${this.props.serverUpdate ? 'server-updated' : ''}`}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Assigner</h1>
          <h1 className="App-subtitle">Assign Items to different Lists</h1>
        </header>
        <Assigner />
      </div>
    )
  }
}

export default connect(
  ({ serverUpdate }) => ({ serverUpdate }),
  { toggleOffServerUpdate }
)(App)