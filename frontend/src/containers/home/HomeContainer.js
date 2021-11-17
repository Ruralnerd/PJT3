import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CarouselList from '../../components/home/CarouselList'
import PopularList from '../../components/home/PopularList'
import SeasonalList from '../../components/home/SeasonalList'
import FarmerStoryList from '../../components/home/FarmerStoryList'
import {
  getCarousel,
  getPopular,
  getSeasonal,
  getStorys,
} from '../../modules/home'

const HomeContainer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch([getCarousel(), getPopular(), getSeasonal(), getStorys()])
    dispatch(getCarousel())
    dispatch(getPopular(3))
    dispatch(getSeasonal())
    dispatch(getStorys())
    return () => {
      // unmount
    }
  }, [dispatch])

  const { carouselList, popularList, seasonalList, storys, loading } =
    useSelector(({ home, loading }) => ({
      carouselList: home.carouselList,
      popularList: home.popularList,
      seasonalList: home.seasonalList,
      storys: home.storys,
      loading: loading,
    }))
  return (
    <div>
      <PopularList
        popularItems={popularList}
        loading={loading['home/GET_POPULAR']}
      />
      <CarouselList
        carouselItems={carouselList}
        loading={loading['home/GET_CAROUSEL']}
      />
      <SeasonalList
        seasonalItems={seasonalList}
        loading={loading['home/GET_SEASONAL']}
      />
      <FarmerStoryList storys={storys} loading={loading['home/GET_STORYS']} />
    </div>
  )
}
export default HomeContainer
