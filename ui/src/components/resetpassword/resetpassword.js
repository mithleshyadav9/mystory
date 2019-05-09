import React,{ Component } from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';




class Changepassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      npwd: '',
      cnpwd: '',
      token: props.token,
      btn: false
    };
  }






  submit(e) {
    e.preventDefault();
    this.setState({btn:true});
    const notification = document.querySelector('#notification');



    if(this.state.npwd === '') {
      notification.classList.add('show');
      this.setState({msg:'Please Provide Your New Password.'});
      this.clearMsg();
      this.setState({btn:false});
      return;
    }

    if(this.state.npwd.length <= 5) {
      notification.classList.add('show');
      this.setState({msg:'Please enter at least 6 Character long Password.'});
      this.clearMsg();
      this.setState({btn:false});
      return;
    }

    if(this.state.cnpwd === '') {
      notification.classList.add('show');
      this.setState({msg:'Please Confirm the Password.'});
      this.clearMsg();
      this.setState({btn:false});
      return;
    }

    if(this.state.cnpwd !== this.state.npwd) {
      notification.classList.add('show');
      this.setState({msg:'Confirmed Password didn\'t matched.'});
      this.clearMsg();
      this.setState({btn:false});
      return;
    }


    const password = {
      token: this.state.token,
      newp: this.state.npwd
    }








    actions.resetPassword(password)
            .then((msg)=>{
              this.setState({msg:'Password has been changed Successfully.'});
              notification.classList.add('show');
      this.clearMsg();
        this.setState({btn:false});
            })
            .catch((err)=>{

              this.setState({msg:err.response.data.errors[0].detail});
              notification.classList.add('show');
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

  return(
    <div>

    <div className="box">
    <div className="box">
      <form onSubmit={(e)=>this.submit(e)}  >


      <div>
      <label htmlFor="New Password">New Password:</label>
      <input name="newpassword" className="form-group" type="password"  value={this.state.npwd} onChange={(e)=>this.setState({npwd:e.target.value})}/>
      </div>




      <div>
      <label htmlFor="Confirm Password">Confirm Password:</label>
      <input name="confirmpassword" className="form-group" type="password"  value={this.state.cnpwd} onChange={(e)=>this.setState({cnpwd:e.target.value})}/>
      </div>




      <input disabled={this.state.btn} className="form-btn" type="submit" value={this.state.btn ? 'Processing Request...' : 'Reset Password'} />

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





export default connect(null)(Changepassword);
