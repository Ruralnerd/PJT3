import { Route, useLocation } from 'react-router-dom'

import TopNav from './components/common/TopNav'
import BottomNav from './components/common/BottomNav'
import Footer from './components/common/Footer'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import StoryPage from './pages/StoryPage'
import FarmPagePage from './pages/FarmPage'
import SearchPage from './pages/SearchPage'
import ProfilePage from './pages/ProfilePage'
import UpdateProfilePage from './pages/UpdateProfilePage'
import MarketPage from './pages/MarketPage'
import MarketDetailPage from './pages/MarketDetailPage'
import MarketSalePage from './pages/MarketSalePage'

const App = () => {
  // 이 아래 두 줄을 이용해서 내 현재 url을 확인할 수 있다.
  // const location = useLocation()
  // console.log(location.pathname)

  return (
    <>
      <TopNav />
      <Route exact path={'/'} component={HomePage} />
      <Route exact path={'/market'} component={MarketPage} />
      <Route path={'/story'} component={StoryPage} />
      <Route path={'/farm'} component={FarmPagePage} />
      <Route path={'/search'} component={SearchPage} />
      <Route exact path={'/profile'} component={ProfilePage} />
      <Route exact path={'/profile/update'} component={UpdateProfilePage} />
      <Route path={'/market/:id'} component={MarketDetailPage} />
      <Route path={'/login'} component={LoginPage} />
      <Route path={'/register'} component={RegisterPage} />
      <Route path={'/sale'} component={MarketSalePage} />
      <Footer />
      <BottomNav />
    </>
  )
}

export default App
