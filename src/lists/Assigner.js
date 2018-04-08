import React, { Component } from 'react'
import { connect } from 'react-redux'
import Muuri from 'muuri'
import List from './list/List'
import { setListsGrid, layoutListsGrid } from './muuri/list/ListsGrid.actions'

class Assigner extends Component {
  componentDidMount() {
    this.listsGrid = new Muuri('.lists.muuri-grid', {
      dragStartPredicate: {
        handle: `.list .drag-handle`
      }
    })
    this.props.setListsGrid(this.listsGrid)

    // setting listsGrid will initialise the itemsGrids, after which a layout is needed
    setTimeout(() => this.props.layoutListsGrid(), 0)
  }

  componentWillUnmount() {
    this.listsGrid.destroy()
  }

  render() {
    const { lists = {} } = this.props
    return (
      <div className='lists muuri-grid'>
        { Object.values(lists).map(l => (
          <List key={l.id} list={l} />
        ))}
      </div>
    )
  }
}

function mapStateToProps({ lists }) {
  return { lists };
}

export default connect(mapStateToProps, { setListsGrid, layoutListsGrid })(Assigner)