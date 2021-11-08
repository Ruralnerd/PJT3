import { Route, useLocation } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import CounterPage from './pages/CounterPage'

const App = () => {
  // 이 아래 두 줄을 이용해서 내 현재 url을 확인할 수 있다.
  const location = useLocation()
  console.log(location.pathname)
  return (
    <div className="App">
      <Route exact path={['/counter']} component={CounterPage} />
      <Route exact path={['/']} component={HomePage} />
      <Route exact path={['/profile']} component={ProfilePage} />
    </div>
  )
}

export default App
