import React,{ Component } from 'react';
import AppBar from '../../app-bar';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../actions';
import {connect} from 'react-redux';




class Addstory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: '',
      success:false,

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


    return(
      <div>
      <label htmlFor={field.input.name}>{field.label}:</label>

      <textarea className={className}   {...field.input}></textarea>

      <div className="count">{field.input.value.length ? `${field.input.value.length}`  : '0'}</div>

      {field.meta.touched && field.meta.error ? <div className="err">{field.meta.error}</div> : ''}


      </div>
    )
  }

  renderSelect(field) {
    const className =  field.meta.touched && field.meta.error ? 'form-group has-err' : 'form-group';

  return(
      <div>
      <label htmlFor={field.input.name}>{field.label}:</label>

      <select className={className}  name={field.input.name} {...field.input}>
      <option value={false}>Only Me</option>
      <option value={true}>Public</option>
      </select>

      {field.meta.touched && field.meta.error ? <div className="err">{field.meta.error}</div> : ''}


      </div>
    )
  }


  submit(value) {
    if(value.public === 'true') {
      value.public = true;
    } else {
      value.public = false;
    }


    actions.writeStory(value)
            .then((msg)=>{
              this.setState({success:true});
            })
            .catch((err)=>{
              this.setState({errors:err.response.data.errors[0].detail});
              this.clearState();
            })

  }

  clearState() {
    setTimeout(()=>{
      this.setState({
        errors: ''
      })
    },5000);
      return false;

  }


  render() {
    if(this.state.success) {
      return <Redirect to={{pathname: `/profile/${this.props.id}`
                          }} />
    }



  return(
    <div>
    <AppBar title="Add Story" back={`/profile/${this.props.id}`} />
    <div className="main">
    <div className="box">
    <div className="box">
        {this.state.errors ? <div className="err">{this.state.errors}</div>  : ''}


      <form onSubmit={this.props.handleSubmit((e)=>this.submit(e))}  >

      <Field label="Title" name="title" type="text" component={this.renderInputs}/>

      <Field label="Story" name="description"  component={this.renderTextArea}/>

      <Field label="Viewer" name="public"  component={this.renderSelect}/>

      <input disabled={this.props.submitting || this.props.invalid} className="form-btn" type="submit" value={this.state.success ? 'Saved' : "Save"} />

      </form>
    </div>
    </div>
    </div>
    </div>
  )
}
}



function validate(value) {

  const errors = {};


  if(!value.title) {
    errors.title = 'Please Enter the Title.';
  }

  if(!value.description) {
    errors.description = 'We would be glad to see you writing your story. ';
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
    id: state.auth.id
  }
}


export default reduxForm({
  validate,
  form: 'add-story',
  enableReinitialize: true
})(connect(mapStateToProps)(Addstory));
