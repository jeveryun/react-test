export function createStore(reducer, enhancer) {

    if (enhancer) {
        return enhancer(createStore)(reducer)
    }

    let currentState = undefined
    const currentListeners = []

    function getState() {
        return currentState
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)

        currentListeners.forEach(v => v())
        return action
    }

    function subscribe(cb) {
        currentListeners.push(cb)
    }

    dispatch({type: '@IMOOC/KKB-REDUX'})
    return {
        getState,
        dispatch,
        subscribe
    }
}

export function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = store.dispatch
        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        const chain = middlewares.map(mw => mw(midApi))

        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            dispatch
        }
    }
}

export function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((left, right) => (...args) => right(left(...args)))
}