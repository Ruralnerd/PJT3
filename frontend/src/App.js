import { Route, useLocation } from 'react-router-dom'
import TopNav from './components/common/TopNav'
import BottomNav from './components/common/BottomNav'
// import Footer from './components/common/Footer'
import Home from './pages/Home'
import Story from './pages/Story'
import Farm from './pages/Farm'
import Search from './pages/Search'
import Profile from './pages/Profile'

// ===================================================================
import MarketPage from './pages/MarketPage'
import MarketDetailPage from './pages/MarketDetailPage'

const App = () => {
  // 요 아래 두 줄을 이용해서 Nav bar를 렌더링 할지 말지 결정이 가능할듯.
  const location = useLocation()
  console.log(location.pathname)
  return (
    <div className="App">
      <TopNav />
      <Route exact path={['/']} component={Home} />
      <Route exact path={['/market']} component={MarketPage} />
      <Route path={['/story']} component={Story} />
      <Route path={['/farm']} component={Farm} />
      <Route path={['/search']} component={Search} />
      <Route path={['/profile']} component={Profile} />
      <Route path={['/market/:id']} component={MarketDetailPage} />
      {/* <Footer /> */}
      <BottomNav />
    </div>
  )
}

export default App
