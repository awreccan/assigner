import React, { Component } from 'react'
import { connect } from 'react-redux'

class Assigner extends Component {
  render() {
    return (
      <div>
        <header>Assigner</header>
        <div>
          { JSON.stringify(this.props.state, null, 2) }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(Assigner)