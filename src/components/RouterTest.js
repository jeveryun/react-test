import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function ProductList(props) {
  return (
    <div>
      <h3>ProductList</h3>
      <Link to="/detail/web">web全栈</Link>
    </div>
  )
}

function ProductMgt(props) {
  return (
    <div>
      <h3>ProductMgt</h3>
      <Link to="/management/search">搜索</Link>
      <Link to="/management/add">新增</Link>
      <Route path="/management/add" component={() => <div>add</div>}></Route>
      <Route path="/management/search" component={() => <div>search</div>}></Route>
      <Redirect to="/management/add"></Redirect>
    </div>
  )
}

function Detail({ match, history, location }) {
  console.log(match, history, location)

  return (
    <div>
      <h3>detail</h3>
      {match.params.name}
      <button onClick={history.goBack}>后退</button>
    </div>
  )
}

const PriviteRoute = connect(state => ({ isLogin: state.user.isLogin }))(function({ component: Component, isLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (isLogin ? <Component></Component> : <Redirect to={{ pathname: '/login', state: { redirec: props.location.pathname } }}></Redirect>)}
    ></Route>
  )
})

function Login() {
  return <div></div>
}

export default class RouterTest extends Component {
  render() {
    return (
      <BrowserRouter>
        <nav>
          <Link to="/">商品列表</Link>
          <Link to="/management">商品管理</Link>
        </nav>

        <Switch>
          <Route path="/" exact component={ProductList}></Route>
          <Route path="/detail/:name" component={Detail}></Route>
          <PriviteRoute path="/management" component={ProductMgt}></PriviteRoute>
          <Route path="/login" component={Login}></Route>
          <Route component={() => <h3>页面不存在</h3>}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
