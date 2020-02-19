import React, { Component } from 'react'
import { createStore, applyMiddleware } from '../store/jredux'

const counterReducer = function(state = 0, action) {
    const num = action.payload || 1
    switch (action.type) {
        case 'add':
            return state + num
        case 'minus':
            return state - num
        default:
            return state
    }
}

function logger({dispatch, getState}) {
    return dispatch => action => {
        console.log(action.type + '执行了！！！');
        return dispatch(action)
    }
}

function thunk({dispatch ,getState}) {
    return dispatch => action => {
        if (typeof action == 'function') {
            return action(dispatch, getState)
        }
        return dispatch(action)
    }
}

const store = createStore(counterReducer, applyMiddleware(logger, thunk))

export default class MyReduxTest extends Component {
    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate()
        })
    }
    render() {
        return (
            <div>
                {store.getState()}
                <div>
                    <button onClick={() => store.dispatch({type: 'add'})}>+</button>
                    <button onClick={() => store.dispatch(function() {
                        setTimeout(() => {
                            store.dispatch({type: 'add'})
                        }, 1000)
                    })}>+</button>
                    {/* <button onClick={this.props.minus}>-</button>
                    <button onClick={this.props.asyncAdd}>+</button> */}
                </div>
            </div>
        )
    }
}
