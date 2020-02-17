import React, { Component } from 'react'

const Context = React.createContext()

const Provider = Context.Provider
const Consumer = Context.Consumer

function withConsumer(Consumer) {
    return Comp => props => {
        return <Consumer>
            {value => <Comp {...value}></Comp>}
            </Consumer>
    }
}

const Child = withConsumer(Consumer)(function(props) {
    return (
        <div onClick={() => props.add()}>
            {props.counter}
        </div>
    )
})


export default class ContextTest extends Component {
    state = {
        counter: 0
    }

    add = () => {
        this.setState({counter:this.state.counter + 1})
    }

    render() {
        return (
            <Provider value={{counter: this.state.counter, add: this.add}}>
                <Consumer>
                    {value => <Child {...value}></Child>}
                </Consumer><Consumer>
                    {value => <Child {...value}></Child>}
                </Consumer><Consumer>
                    {value => <Child {...value}></Child>}
                </Consumer>
            </Provider>
        )
    }
}
