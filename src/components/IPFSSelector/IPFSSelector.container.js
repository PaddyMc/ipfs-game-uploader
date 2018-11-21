import { connect } from 'react-redux'
import { changeIPFSLocation
       } from '../../actions/actions'

import IPFSSelector from './IPFSSelector.component.js'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeIPFSLocation: (event) => dispatch(changeIPFSLocation(event))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IPFSSelector)