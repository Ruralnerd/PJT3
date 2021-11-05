/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import MyPage from './pages/MyPage'
import Account from './pages/Account'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* 경로상에 '/'가 존재하는 url들이 많으므로 정확하게 '/'만 있는 url을 구분지으려면 exact path를 사용해야 한다. */}
          <Route exact path="/" component={MainPage} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/mypage/account" component={Account} />
        </Switch>
      </div>
    </Router>
  )
}
export default App
