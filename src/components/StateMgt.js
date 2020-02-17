import React, { Component } from 'react'

class Clock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      counter: 0
    }
  }

  componentDidMount() {
    this.setState({ counter: this.state.counter + 1 })
    this.setState({ counter: this.state.counter + 1 })
    this.setState({ counter: this.state.counter + 1 })
    this.timerId = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    return (
      <div>
        {this.state.date.toLocaleTimeString()}
        {this.state.counter}
      </div>
    )
  }
}

export default function StateMgt() {
  return (
    <div>
      <Clock />
    </div>
  )
}
