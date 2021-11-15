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
    dispatch(getPopular())
    dispatch(getSeasonal())
    dispatch(getStorys())
    return () => {
      // unmount
    }
  }, [dispatch])

  const { carouselList, popularList, seasonalList, storys } = useSelector(
    ({ home }) => ({
      carouselList: home.carouselList,
      popularList: home.popularList,
      seasonalList: home.seasonalList,
      storys: home.storys,
    }),
  )

  return (
    <div>
      <CarouselList carouselItems={carouselList} />
      <PopularList popularItems={popularList} />
      <SeasonalList seasonalItems={seasonalList} />
      <FarmerStoryList storys={storys} />
    </div>
  )
}
export default HomeContainer
