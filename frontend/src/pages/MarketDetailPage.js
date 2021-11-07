import SaleTemplate from '../components/market/SaleTemplate'
import MarketDetail from '../containers/market/MarketDetail'

const MarketDetailPage = ({ match }) => {
  return (
    <SaleTemplate>
      <MarketDetail match={match} />
    </SaleTemplate>
  )
}

export default MarketDetailPage
