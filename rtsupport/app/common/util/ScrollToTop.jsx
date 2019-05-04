import { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
      const nextSubpath = this.props.location.pathname.substring(1)
      const prevSubpath = prevProps.location.pathname.substring(1)
      const nextFirstLevelRoute = nextSubpath.substring(0,nextSubpath.indexOf('/'))
      const prevFirstLevelRoute = prevSubpath.substring(0,prevSubpath.indexOf('/'))
      if (nextFirstLevelRoute !== prevFirstLevelRoute) {
        window.scrollTo(0, 0);
      }
    }
  
    render() {
      return this.props.children;
    }
  }
  
  export default withRouter(ScrollToTop);