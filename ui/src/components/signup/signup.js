import React,{ Component } from 'react';
import AppBar from '../app-bar';
import { Field, reduxForm } from 'redux-form';
import { Redirect,NavLink } from 'react-router-dom';

import * as actions from '../../actions';




class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      success:false,
      username: '',
      password: ''

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
      email: value.email,
      password: value.password
    }
this.setState({username: value.username,
                password: value.password});
const notification = document.querySelector('#notification');

    actions.registerUser(user)
            .then((msg)=>{
              this.setState({msg:'You\'re Successfully registered Now.'});
              notification.classList.add('show');
              this.clearState();
            })
            .catch((err)=>{
              this.setState({msg:err.response.data.msg});
              notification.classList.add('show');
              this.clearState();
            })

  }

  clearState() {
    setTimeout(()=>{
      const notification = document.querySelector('#notification');
      if(notification.classList.contains('show')){
        notification.classList.remove('show');
      }
    },3000);
    return false;
  }


  render() {
    if(this.state.success) {
      return <Redirect to={{pathname: '/login',
                            state: { username: this.state.username,
                                     password: this.state.password,
                                     success:true}
                          }} />
    }

  return(
    <div>
    <AppBar title="SignUp" back={`/`} />
    <div className="main">
    <div className="box">
    <div className="box">


      <form onSubmit={this.props.handleSubmit((e)=>this.submit(e))}>

      <Field label="Username" name="username" type="text" component={this.renderInputs}/>

      <Field label="Email" name="email" type="email" component={this.renderInputs}/>

      <Field label="Password" name="password" type="password" component={this.renderInputs}/>

      <Field label="Confirm Password" name="confirmpassword" type="password" component={this.renderInputs}/>

      <input disabled={this.props.pristine || this.props.invalid} className="form-btn" type="submit" value={this.state.success ? 'Registered' : "SignUp"} />

      <NavLink to={{pathname:'/login'}}>
      <button  className="form-btn">Already Registered.</button>
      </NavLink>
      </form>

    </div>
    </div>
    <div id="notification" className="notification">
    <span><i className="far fa-bell" ></i> &nbsp;&nbsp;{this.state.msg}</span>
    </div>
    </div>
    </div>

  )
}
}



function validate(value) {

  const errors = {};

  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(value.email){
    const e = value.email.toLowerCase();
    if(!regex.test(e)){
      errors.email = 'Please Enter a valid email.'
    }
  }

  if(!value.username) {
    errors.username = 'Please Enter a username.';
  }else {
    if(value.username.length < 6) {
      errors.username = 'Please enter more than Six Character Username.';
    }
  }

  if(!value.email) {
    errors.email = 'Please Enter a Email.';
  }

  if(!value.password) {
    errors.password = 'Please Enter a Password.';
  }else {
    if(value.password.length < 6) {
      errors.password = 'Please enter more than Six Character Password.';
    }
  }

  if(value.confirmpassword) {
    if(!(value.confirmpassword === value.password)) {
      errors.confirmpassword = 'Password you entered didn\'t matched.';
    }
  }


  return errors;
}



export default reduxForm({
  validate,
  form: 'signup-Form'
})(Signup);
