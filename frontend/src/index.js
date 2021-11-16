import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './fonts/font.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer, { rootSaga } from './modules'
import createSagaMiddleware from 'redux-saga'
import { check } from './modules/auth'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
)

function loadUser() {
  try {
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    if (token !== null && user_id !== null) {
      store.dispatch(check({ user_id, token }))
    }
  } catch (e) {
    console.log(e)
  }
}

sagaMiddleware.run(rootSaga)
loadUser()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
