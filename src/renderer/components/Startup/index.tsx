import * as React from 'react'
import { withRouter } from 'react-router-dom'

class Startup extends React.Component<{ token: string; history: any }, { logged: boolean }> {
  state = {
    logged: false
  }

  componentDidMount() {
    if (!this.props.token) {
      this.setState({ logged: false })
      this.props.history.push('/login')
    } else {
      this.setState({ logged: true })
      this.props.history.push('/app')
    }
  }

  render() {
    if (this.state.logged) {
      return <p>redirecting app page</p>
    }
    return <p>redirecting to login page</p>
  }
}

export default withRouter(Startup as any)
