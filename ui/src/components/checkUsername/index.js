import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import AppBar from '../app-bar';
import * as actions from '../../actions';

class CheckUsername extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: '',
      id: ''
    }
  }
  componentWillMount() {
    actions.checkUsername(this.props.match.params.username)
           .then(res=>res.data)
           .then(data => this.setState({id:data.id}))
           .catch((err)=>{
             return this.setState({err:err.response.data.errors[0].detail});
           })
  }

  renderErros() {
    return(
      <div className="empty">
    <div>{this.state.err}</div>
    </div>
  )
  }

  render() {
    if(this.state.id) {
      return (<Redirect to={{pathname:`/profile/${this.state.id}`}} />)
    }


    return (
      <div>

      <AppBar title="Profile" back="/home" />
      <div className="main">
      {this.state.err
      ? this.renderErros()
      : <div className="loading"><i className="fa fa-spinner fa-spin"></i>Loading...</div>}
      </div>
      </div>




    )
  }
}

export default CheckUsername;
