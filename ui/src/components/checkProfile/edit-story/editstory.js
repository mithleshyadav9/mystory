import React,{ Component } from 'react';

import { Redirect } from 'react-router-dom';

import * as actions from '../../../actions';
import {connect} from 'react-redux';




class Editstory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      title: props.title,
      description: props.description,
      public: props.public,
      btn: false
    };
  }






  submit(e) {
    e.preventDefault();
    this.setState({btn:true});
    const notification = document.querySelector('#notification');

    if(this.state.title === '') {
      notification.classList.add('show');
      this.setState({msg:'Please Provide the Title to Your Story.'});
      this.clearMsg();
      return;
    }

    if(this.state.description === '') {
      notification.classList.add('show');
      this.setState({msg:'You cannot leave the Description empty.'});
      this.clearMsg();
      return;
    }


    const story = {
      title: this.state.title,
      description: this.state.description,
      public: this.state.public
    }








    actions.storyEdit(this.props.id,story)
            .then((msg)=>{
              notification.classList.add('show');
              this.setState({msg:msg.data.msg});
              this.clearMsg();
              this.setState({btn:false});
            })
            .catch((err)=>{
              console.log(err.response);
              notification.classList.add('show');
              this.setState({msg:err.response.data.errors[0].detail});
              this.clearMsg();
              this.setState({btn:false});
            })

  }

  clearMsg() {
    setTimeout(()=>{
      const notification = document.querySelector('#notification');
      if(notification.classList.contains('show')){
        notification.classList.remove('show');
      }


    },3000);
  }









  render() {
    if(this.state.success) {
      return <Redirect to={{pathname: `/home`
                          }} />
    }






  return(
    <div>

    <div className="box">
    <div className="box">


      <form onSubmit={(e)=>this.submit(e)}  >

      <div>
      <label htmlFor="Title">Title:</label>
      <input name="title" className="form-group" type="text"  value={this.state.title} onChange={(e)=>this.setState({title:e.target.value})}/>
      </div>

      <div>
      <label htmlFor="description">Description:</label>

      <textarea name="description" className="form-group" value={this.state.description} onChange={(e)=>this.setState({description:e.target.value})}>

      </textarea>

      <div className="count">{this.state.description.length ? `${this.state.description.length}`  : '0'}</div>

      </div>
      <label htmlFor="Viewer">Viewer:</label>

      <select name="public" className="form-group" value={this.state.public} onChange={(e)=>this.setState({public:e.target.value})} >
      <option value={false}>Only Me</option>
      <option value={true}>Public</option>
      </select>



      <input disabled={this.state.btn} className="form-btn" type="submit" value={this.state.btn ? 'Saving...' : "Save"} />

      </form>
    </div>
    </div>
    <div id="notification" className="notification">
    <span><i className="far fa-bell" ></i> &nbsp;&nbsp;{this.state.msg}</span>
    </div>
    </div>
  )
}
}





export default connect(null)(Editstory);
