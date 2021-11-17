/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import Card from '../common/Card'
import LinearProgressBar from '../common/LinearProgressBar'
import { Grid, Box } from '@mui/material'

const PopularWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 2rem;
`

const PopularBody = styled.div``

const PopularHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`

const PopularList = ({ popularItems, loading }) => {
  if (loading || !popularItems) {
    return <LinearProgressBar />
  }

  return (
    <PopularWrapper>
      <PopularHeader>
        <div>사람들이 많이 본 상품 TOP3에요!</div>
      </PopularHeader>
      <PopularBody>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            {popularItems.map((item) => (
              <Grid item xs={12} md={3} key={item.id}>
                <Card item={item} />
              </Grid>
            ))}
            <Grid item xs={12} md={3}>
              <Card type="popular" />
            </Grid>
          </Grid>
        </Box>
      </PopularBody>
    </PopularWrapper>
  )
}
export default PopularList
