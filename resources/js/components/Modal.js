import React from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal } from '../redux/actions/utils/utilsActions';


class Modal extends React.Component {

  componentDidMount() {
    this.props.showModal()
  }

  componentWillUnmount() {
    this.props.hideModal()
  }

  render() {
    return <div className="modal visible center">
      {this.props.children}
    </div>
  }
}
export default connect(() => {},{
  showModal,
  hideModal
})(Modal)