import { Route, useLocation } from 'react-router-dom'

import TopNav from './components/common/TopNav'
import BottomNav from './components/common/BottomNav'
import Footer from './components/common/Footer'

import HomePage from './pages/common/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import FarmPagePage from './pages/common/FarmPage'
import SaleFormPage from './pages/sale/SaleFormPage'
import SaleDetailPage from './pages/sale/SaleDetailPage'
import SaleListPage from './pages/sale/SaleListPage'
import StoryListPage from './pages/story/StoryListPage'
import StoryEditorPage from './pages/story/StoryEditorPage'
import StoryDetailPage from './pages/story/StoryDetailPage'
import SearchPage from './pages/common/SearchPage'
import ProfilePage from './pages/profile/ProfilePage'
import ProfileUpdatePage from './pages/profile/ProfileUpdatePage'
import ProfileAccountPage from './pages/profile/ProfileAccountPage'

const App = () => {
  // 이 아래 두 줄을 이용해서 내 현재 url을 확인할 수 있다.
  const location = useLocation()
  console.log(location.pathname)

  return (
    <>
      <TopNav />
      <Route exact path={'/'} component={HomePage} />
      <Route path={'/login'} component={LoginPage} />
      <Route path={'/register'} component={RegisterPage} />
      <Route exact path={'/market'} component={SaleListPage} />
      <Route exact path={'/market/:market_pk'} component={SaleDetailPage} />
      <Route path={'/sale'} component={SaleFormPage} />
      <Route exact path={'/story'} component={StoryListPage} />
      <Route exact path={'/editor/story'} component={StoryEditorPage} />
      <Route exact path={'/story/:id'} component={StoryDetailPage} />
      <Route path={'/farm'} component={FarmPagePage} />
      <Route path={'/search'} component={SearchPage} />
      <Route exact path={'/profile'} component={ProfilePage} />
      <Route exact path={'/profile/update'} component={ProfileUpdatePage} />
      <Route exact path={'/profile/account'} component={ProfileAccountPage} />
      <Footer />
      <BottomNav />
    </>
  )
}

export default App
