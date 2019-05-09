import React,{ Component } from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';




class Changepassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      email: '',
      btn: false,
      success: false
    };
  }






  submit(e) {
    e.preventDefault();
    this.setState({btn:true});
    const notification = document.querySelector('#notification');
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



    if(this.state.email === '') {
      notification.classList.add('show');
      this.setState({msg:'Please Provide Your Email.'});
      this.clearMsg();
      this.setState({btn:false});
      return;
    }

    if(!regex.test(this.state.email)) {
      notification.classList.add('show');
      this.setState({msg:'Please Enter a valid Email.'});
      this.clearMsg();
      this.setState({btn:false});
      return;
    }




    const email = {
      email: this.state.email
    }



    actions.requestForgetPassword(email)
            .then((msg)=>{
        this.setState({btn:false});
        this.setState({success:true});
            })
            .catch((err)=>{
              console.log(err.response);

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

      { this.state.success
      ? <label className="email-info"> <div>A link has been sent to the email you entered.</div><div>Please Check your Email.</div><div>If you don't find any email You can check your spam folder also.</div></label>
      :<form onSubmit={(e)=>this.submit(e)}  >


      <div>
      <label htmlFor="Email">Please Enter the Email associated with Your Account:</label>
      <input name="email" className="form-group" type="text"  value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/>
      </div>









      <input disabled={this.state.btn} className="form-btn" type="submit" value={this.state.btn ? 'Sending...' : 'Send'} />

      </form>}

    </div>
    </div>
    <div id="notification" className="notification">
    <span><i className="far fa-bell" ></i>{this.state.msg}</span>
    </div>
    </div>
  )
}
}





export default connect(null)(Changepassword);
