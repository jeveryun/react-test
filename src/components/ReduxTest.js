import React, { Component } from 'react'
// import store from '../store'
import { connect } from 'react-redux'
import { add, minus, asyncAdd } from '../store/counter'

@connect(
    state => ({num: state.counter}),
    {
        add, minus, asyncAdd
    }
)
class ReduxTest extends Component {
    // componentDidMount() {
    //     store.subscribe(() => {
    //         this.forceUpdate()
    //     })
    // }
    render() {
        return (
            <div>
                {/* {store.getState()} */}
                {this.props.num}
                <div>
                    <button onClick={() => this.props.add(2)}>+</button>
                    <button onClick={this.props.minus}>-</button>
                    <button onClick={this.props.asyncAdd}>+</button>
                </div>
            </div>
        )
    }
}
export default ReduxTest