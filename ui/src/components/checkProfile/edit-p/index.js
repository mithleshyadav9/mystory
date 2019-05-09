import React,{ Component } from 'react';
import Editstory from './editstory';

import AppBar from '../../app-bar';


import * as actions from '../../../actions';
import {connect} from 'react-redux';

class EditStory extends Component {
componentWillMount() {
  this.props.dispatch(actions.fetchMe());
}

  renderErros(errors) {
      return(
        <div>
        <AppBar title="Edit Profile" back={`/profile/${this.props.id}`} />
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
      <AppBar title="Edit Profile" back={`/profile/${this.props.id}`} />
      <div className="main">
      {this.props.me
      ? <Editstory id={this.props.id} fname={this.props.me.fname ? this.props.me.fname :''} lname={this.props.me.lname ? this.props.me.lname :''} bio={this.props.me.bio ? this.props.me.bio :''} website={this.props.me.website ? this.props.me.website :''} image={this.props.me.image ? this.props.me.image :''} />
      :       <div className="loading"><i className="fa fa-spinner fa-spin"></i>Loading...</div>}
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
export default connect(mapStateToProps)(EditStory);
