import React, { Component } from 'react'
import { connect } from 'react-redux'
import Muuri from 'muuri'
import List from './list/List'
import { setListsGrid } from './muuri/list/ListsGrid.actions'

class Assigner extends Component {
  componentDidMount() {
    const listsGrid = new Muuri('.lists.muuri-grid', {
      dragStartPredicate: {
        handle: `.list .drag-handle`
      }
    })
    this.props.setListsGrid(listsGrid)
  }

  render() {
    const { lists = {} } = this.props
    return (
      <div>
        <header>Assigner: Assign Items to Different Lists</header>
        <div className='lists muuri-grid'>
          { Object.values(lists).map(l => (
            <List key={l.id} list={l} />
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ lists }) {
  return { lists };
}

export default connect(mapStateToProps, { setListsGrid })(Assigner)