import React,{ Component } from 'react';
import ImgUpload from './imgUpload';
import * as actions from '../../../actions';
import {connect} from 'react-redux';




class Editstory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      fname: props.fname,
      lname: props.lname,
      bio: props.bio,
      website: props.website,
      btn: false
    };
  }






  submit(e) {

    e.preventDefault();

    const notification = document.querySelector('#notification');
    this.setState({btn:true});

    if(this.state.fname === '') {
      notification.classList.add('show');
      this.setState({msg:'Please Provide Your First name.'});
      this.clearMsg();
      this.setState({btn:false});
      return;
    }

    if(this.state.lname === '') {
      notification.classList.add('show');
      this.setState({msg:'Please Provide Your Last name.'});
      this.clearMsg();
      this.setState({btn:false});
      return;
    }

    if(this.state.bio === '') {
      notification.classList.add('show');
      this.setState({msg:'You cannot leave the Bio empty.'});
      this.clearMsg();
      this.setState({btn:false});
      return;
    }

    if(this.state.bio.length > 120) {
      notification.classList.add('show');
      this.setState({msg:'Please Check the Bio length.'});
      this.clearMsg();
      this.setState({btn:false});
      return;
    }


    const profile = {
      fname: this.state.fname,
      lname: this.state.lname,
      bio: this.state.bio,
      website: this.state.website
    }








    actions.updateProfile(profile)
            .then((msg)=>{
              this.setState({msg:'Profile Information has been Saved.'});
              notification.classList.add('show');
      this.clearMsg();
        this.setState({btn:false});
            })
            .catch((err)=>{
              this.setState({msg:err.response.data.msg});
              notification.classList.add('show');
      this.clearMsg();
        this.setState({btn:false});
            })

  }

 addMsg(text) {
   const notification = document.querySelector('#notification');

   notification.classList.add('show');
     this.setState({msg:text});
     this.clearMsg();
 }

 notify(text) {
  const notification = document.querySelector('#notification');

   notification.classList.add('show');
     this.setState({msg:text});
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


  return(
    <div>

    <div className="box">
    <div className="box">
      <ImgUpload notify={(t)=>this.notify(t)} image={this.props.image} id={this.props.id} msg={ (text)=>this.addMsg(text) }/>
      <form onSubmit={(e)=>this.submit(e)}  >

      <div>
      <label htmlFor="First Name">First Name:</label>
      <input name="fname" className="form-group" type="text"  value={this.state.fname} onChange={(e)=>this.setState({fname:e.target.value})}/>
      </div>

      <div>
      <label htmlFor="Last Name">Last Name:</label>
      <input name="lname" className="form-group" type="text"  value={this.state.lname} onChange={(e)=>this.setState({lname:e.target.value})}/>
      </div>


      <div>
      <label htmlFor="Bio">Bio:</label>

      <textarea name="bio" className="form-group" value={this.state.bio} onChange={(e)=>this.setState({bio:e.target.value})}>

      </textarea>

      <div className="count">{this.state.bio.length ? this.state.bio.length > 120 ? <span className="err"> {this.state.bio.length}/120 </span> : `${this.state.bio.length}/120`    : '0/120'}</div>

      </div>

      <div>
      <label htmlFor="Website">Website:</label>
      <input name="website" className="form-group" type="text"  value={this.state.website} onChange={(e)=>this.setState({website:e.target.value})}/>
      </div>



      <input disabled={this.state.btn} className="form-btn" type="submit" value={this.state.btn ? 'Saving...' : 'Save'} />

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
