import { Route, useLocation } from 'react-router-dom'
import TopNav from './components/TopNav'
import BottomNav from './components/BottomNav'
import Footer from './components/Footer'
import Home from './views/Home'
import Market from './views/Market'
import Story from './views/Story'
import Farm from './views/Farm'
import Search from './views/Search'
import Profile from './views/Profile'

// ===================================================================

function App() {
  // 요 아래 두 줄을 이용해서 Nav bar를 렌더링 할지 말지 결정이 가능할듯.
  // const location = useLocation()
  // console.log(location.pathname)
  return (
    <div className="App">
      <TopNav />
      <Route exact path={['/']} component={Home} />
      <Route path={['/market']} component={Market} />
      <Route path={['/story']} component={Story} />
      <Route path={['/farm']} component={Farm} />
      <Route path={['/search']} component={Search} />
      <Route path={['/profile']} component={Profile} />
      <Footer />
      <BottomNav />
    </div>
  )
}

export default App
