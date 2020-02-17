import React, { Component } from 'react'
import logo from '../logo.png'
import style from './index.module.css'

export default class JsxTest extends Component {
  render() {
    return (
      <div>
        <img src={logo} alt='' className={style.img} />
      </div>
    )
  }
}
