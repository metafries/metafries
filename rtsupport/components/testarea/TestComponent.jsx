import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './testActions.jsx'

const mapState = (state) => ({
    data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter
}

class TestComponent extends Component {
  render() {
    const { incrementCounter, decrementCounter, data } = this.props
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <button onClick={incrementCounter} type='button' className='btn btn-success'>Increment</button>
        <button onClick={decrementCounter} type='button' className='btn btn-danger'>Decrement</button>
      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent)