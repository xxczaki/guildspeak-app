import { connect } from 'react-redux'
import { RootState } from '../reducers'
import { SetTokenAction, setToken } from '../actions/authActions'
import { Dispatch } from 'redux'
import StartupComponent from '../components/StartupComponent'

import { withRouter } from 'react-router-dom'

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token
})

const mapDispatchToProps = (dispatch: Dispatch<SetTokenAction>) => ({
  setToken: (token) => dispatch(setToken(token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartupComponent)
