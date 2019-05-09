import React,{ Component } from 'react';
import Changepassword from './changepassword';

import AppBar from '../../app-bar';


import * as actions from '../../../actions';
import {connect} from 'react-redux';

class ChangePassword extends Component {
componentWillMount() {
  this.props.dispatch(actions.fetchMe());
}

  renderErros(errors) {
      return(
        <div>
        <AppBar title="Change Password" back={`/profile/${this.props.id}`} />
        <div className="main">
        <div className="empty">
        <div>{errors[0].detail}</div>
        </div>
        </div>
        </div>

      )
    }


  render() {
    if (this.props.errors) {
       if(this.props.errors.length > 0) {
         return this.renderErros(this.props.errors);
       }
      }

    return(
      <div>
      <AppBar title="Change Password" back={`/profile/${this.props.id}`} />
      <div className="main">
      {this.props.me
      ? <Changepassword  />
      : <div className="loading"><i className="fa fa-spinner fa-spin"></i>Loading...</div>}
      </div>
      </div>
    )
  }

}

function mapStateToProps(state) {

  return {
    me: state.me.data,
    errors: state.me.errors,
    id: state.auth.id
  }
}
export default connect(mapStateToProps)(ChangePassword);
