/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import Card from '../common/Card'
import { Grid, Box } from '@mui/material'

const SeasonalWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 2rem;
`

const SeasonalBody = styled.div`
  padding: 10px;
`

const SeasonalHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 24px 0;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`

const SeasonalList = ({ seasonalItems, loading }) => {
  if (loading || !seasonalItems) {
    return null
  }

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5)
  }
  shuffle(seasonalItems)

  return (
    <SeasonalWrapper>
      <SeasonalHeader>최고로 신선! 방금 등록된 상품</SeasonalHeader>
      <SeasonalBody>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            {seasonalItems.map((item) => (
              <Grid item xs={12} md={3} key={item.id}>
                <Card item={item} />
              </Grid>
            ))}
            <Grid item xs={12} md={3}>
              <Card type={'recently'} />
            </Grid>
          </Grid>
        </Box>
      </SeasonalBody>
    </SeasonalWrapper>
  )
}
export default SeasonalList
