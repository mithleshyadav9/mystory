import React, { Component } from 'react';
import UserProfile from './users-profile';
import ProfilePage from './profile-page';
import AppBar from '../app-bar';

import * as actions from '../../actions';
import {connect} from 'react-redux';

class CheckProfile extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchUserById(this.props.match.params.id));
    this.props.dispatch(actions.fetchMe());

  }





  renderError(errors) {

    return(
      <div>
      <AppBar title="Profile" back="/"/>
      <div className="main">
      <div className="empty">
       <div>{errors[0].detail}</div>
      </div>
      </div>
      </div>
    )

  }
  render() {

    if(this.props.errors.length > 0) {
      return this.renderError(this.props.errors);
    }

    // if(this.props.user) {
    //   if(this.props.user.fname) {
    //
    //   }else {
    //     return(
    //       <div className="error">
    //        <div>Please enter your name</div>
    //       </div>
    //     )
    //   }
    // }

      if(this.props.user) {
      if(this.props.match.params.id.toString() === this.props.id.toString()) {
        return(
          <ProfilePage id={this.props.match.params.id} isAuth={this.props.isAuth} me={this.props.me} meErrors={this.props.meError} user={this.props.user}/>
        )
      } else {
        return(
          <UserProfile id={this.props.match.params.id} isAuth={this.props.isAuth} me={this.props.me} meErrors={this.props.meError} user={this.props.user}/>
        )

      }
    }else {

      return(
      <div>
      <AppBar title="Profile" back="/home"/>
      <div className="main">
      
      <div className="loading">
      <i className="fa fa-spinner fa-spin"></i>Loading...
      </div>
      </div>
      </div>
    )

    }
  

  
}
}

function mapStateToProps(state) {

  return{
    user:state.userById.data,
    errors:state.userById.errors,
    id: state.auth.id,
    isAuth: state.auth.isAuth,
    me: state.me.data,
    meError: state.me.errors
  }
}


export default connect(mapStateToProps)(CheckProfile);
