import React from 'react'
import { installDemoLogger, installDevLogger } from './state/init'

export default class Demo extends React.Component {
  componentDidMount() {
    this.props.dev ? installDevLogger() : installDemoLogger()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dev && !this.props.dev) {

      console.log('dev on')
      installDevLogger()

    } else if (!nextProps.dev && this.props.dev) {

      console.log('dev off')
      installDemoLogger()

    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}