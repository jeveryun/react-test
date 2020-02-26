import { call, put, takeEvery } from 'redux-saga/effects'

const UserService = {
  login(uname) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (uname === 'jever') {
          resolve({ id: 1, name: 'Jever', age: 18 })
        } else {
          reject('用户名或者密码错误')
        }
      })
    })
  }
}

function* login(action) {
  try {
    yield put({ type: 'requsetLogin' })
    const result = yield call(UserService.login, action.uname)
    yield put({ type: 'loginSuccess', result })
  } catch (message) {
    yield put({ type: 'loginFailure', payload: message })
  }
}

function* mySage() {
  yield takeEvery('login', login)
}

export default mySage
