import React,{ Component } from 'react';
import AppBar from '../../app-bar';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../actions';
import {connect} from 'react-redux';




class Editprofile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: ''
    };
  }




  renderInputs(field) {


    const className =  field.meta.touched && field.meta.error ? 'form-group has-err' : 'form-group';
    return(
      <div>
      <label htmlFor={field.input.name}>{field.label}:</label>
      <input className={className} type={field.type}  {...field.input}/>
      {field.meta.touched && field.meta.error ? <div className="err">{field.meta.error}</div> : ''}

      </div>
    )
  }

  renderTextArea(field) {


    const className =  field.meta.touched && field.meta.error ? 'form-group has-err' : 'form-group';
    const count =  field.meta.touched && field.meta.error ? 'count err' : 'count';

    return(
      <div>
      <label htmlFor={field.input.name}>{field.label}:</label>

      <textarea className={className}   {...field.input}></textarea>

      <div className={count}>{field.input.value.length ? `${field.input.value.length}`  : '0'}/120</div>


      </div>
    )
  }


  submit(value) {

const notification = document.querySelector('#notification');
    actions.updateProfile(value)
            .then((msg)=>{
              this.setState({msg:'Profile Information has been Saved.'});
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
    return setTimeout(()=>{
      this.setState({
        msg: ''
      })
      const notification = document.querySelector('#notification');
      notification.classList.remove('show');
    },4000);
  }


  render() {


  return(
    <div>
    <AppBar title="Edit Profile" back={`/profile/${this.props.id}`} />
    <div className="main">
    <div className="box">
    <div className="box">


      <form onSubmit={this.props.handleSubmit((e)=>this.submit(e))}  >

      <Field label="First Name" initialvalue="hello" name="fname" type="text" component={this.renderInputs}/>

      <Field label="Last Name" name="lname" type="text" component={this.renderInputs}/>

      <Field label="Bio" name="bio"  component={this.renderTextArea}/>

      <Field label="Webiste" name="website" type="url" component={this.renderInputs}/>

      <input disabled={this.props.submitting || this.props.invalid} className="form-btn" type="submit" value={this.state.success ? 'Saved' : "Save"} />

      </form>
    </div>
    </div>
    <div id="notification" className="notification">
    <span>{this.state.msg}</span>
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

  if(!value.fname) {
    errors.fname = 'Please Enter the First Name.';
  }

  if(!value.lname) {
    errors.lname = 'Please Enter the Last Name.';
  }



  if(!value.bio) {
    errors.bio = 'You cannot leave this field empty.';
  }else {
      if(!(value.bio.length < 121)) {
        errors.bio = 'Limit Exceded'
      }
  }



  return errors;
}

function mapStateToProps(state) {
  return {
    id: state.auth.id,

  }
}


export default reduxForm({
  validate,
  form: 'edit-profile',
  enableReinitialize: true
})(connect(mapStateToProps)(Editprofile));
