import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import Button from '../common/Button'
import LinearProgressBar from '../common/LinearProgressBar'
import { Link } from 'react-router-dom'
import SubInfo from '../common/SubInfo'
import { Grid } from '@mui/material'
import SaleListCard from '../common/SaleListCard'

const SaleListWrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
`

const SaleListButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

const SaleListBody = styled.div`
  padding: 10px 20px;
`

const SaleList = ({ sales, error, loading, auth }) => {
  if (error) {
    return <SaleListWrapper>오류 발생!</SaleListWrapper>
  }
  if (loading || !sales) {
    return <LinearProgressBar />
  }
  return (
    <SaleListWrapper>
      <SaleListButtonWrapper>
        {auth.id !== null && auth.token !== null && (
          <Button cyan to="/sale">
            판매 글 작성하기
          </Button>
        )}
      </SaleListButtonWrapper>
      <SaleListBody>
        <Grid container spacing={2}>
          {sales.map((sale) => (
            <Grid item xs={12} sm={6} md={4} key={sale.id}>
              <SaleListCard sale={sale} />
            </Grid>
          ))}
        </Grid>
      </SaleListBody>
    </SaleListWrapper>
  )
}

export default SaleList
