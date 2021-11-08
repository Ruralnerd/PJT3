import { connect } from 'react-redux'
import { increase, decrease } from '../../modules/counter'
import Counter from '../../components/home/Counter'

const CounterContainer = ({ number, increase, decrease }) => {
  return <Counter number={number} onIncrease={increase} onDecrease={decrease} />
}

export default connect(
  (state) => ({
    number: state.Counter,
  }),
  {
    increase,
    decrease,
  },
)(CounterContainer)
