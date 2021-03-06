import { connect } from 'react-redux'
import { RootState } from '../reducers'
import { SetChannelId, setChannelId } from '../actions/currentChannelActions'
import { Dispatch } from 'redux'
import Application from '../views/Application'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  channelId: state.currentChannel.channelId
})

const mapDispatchToProps = (dispatch: Dispatch<SetChannelId>) => ({
  setChannelId: channelId => dispatch(setChannelId(channelId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
