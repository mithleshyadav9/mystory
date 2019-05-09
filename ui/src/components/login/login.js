import React,{ Component } from 'react';
import {Redirect,NavLink} from 'react-router-dom';
import AppBar from '../app-bar';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../../actions';

import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: '',
      success:false
    };
  }




  renderInputs(field) {


  const className =  field.meta.touched && field.meta.error ? 'form-group has-err' : 'form-group';
    return(
      <div>
      <label htmlFor={field.input.name}>{field.label}:</label>
      <input className={className} type={field.type} {...field.input}/>
      {field.meta.touched && field.meta.error ? <div className="err">{field.meta.error}</div> : ''}

      </div>
    )
  }

  submit(value) {


    const user = {
      username: value.username,
      password: value.password
    }

    this.props.dispatch(actions.login(user));

  }



  render() {

  if(this.props.errors) {
    if(this.props.errors.length > 0) {
      const notification = document.querySelector('#notification');
      notification.classList.add('show');
      setTimeout(()=>{
        this.props.dispatch(actions.clearLogin());
        if(notification.classList.contains('show')){
          notification.classList.remove('show');
        }
      },3500);
    }
  }

  if(this.props.isAuth) {
    return <Redirect to={{pathname: '/home'}} />
  }

  return(


    <div>
    <AppBar title="Login" back={`/`} />
    <div className="main">
    <div className="box">
    <div className="box">


      <form onSubmit={this.props.handleSubmit((e)=>this.submit(e))}>

      <Field  label="Username or Email" name="username" type="text" component={this.renderInputs}/>


      <Field  label="Password" name="password" type="password" component={this.renderInputs}/>

      <NavLink to={{pathname:'/forget/password'}}>
      <div className="fp-link">Forget Password ?</div>
      </NavLink>


      <input disabled={this.props.pristine || this.props.invalid} className="form-btn" type="submit" value={this.props.submitting ? 'Logging In' : 'Login'} />

      <NavLink to={{pathname:'/signup'}}>
      <button  className="form-btn">Don't have an User Account?</button>
      </NavLink>
      </form>
    </div>
    </div>
    <div id="notification" className="notification">
    <span><i className="far fa-bell" ></i> &nbsp;&nbsp;{this.props.errors.length > 0 ? <span className="err">{this.props.errors[0].detail}</span>  : ''}</span>
    </div>
    </div>
    </div>
  )
}
}



function validate(value) {

  const errors = {};


  if(!value.username) {
    errors.username = 'Please Enter a Email or Username.';
  }

  if(!value.email) {
    errors.email = 'Please Enter a Email.';
  }

  if(!value.password) {
    errors.password = 'Please Enter a Password.';
  }

  return errors;
}

function mapStateToProps(state) {

  return {
    isAuth: state.auth.isAuth,
    errors: state.auth.errors
  }
}


export default reduxForm({
  validate,
  form: 'login-Form'
})(connect(mapStateToProps)(Login));
