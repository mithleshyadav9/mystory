import React from 'react';
import Resetpassword from './resetpassword';

import AppBar from '../app-bar';




const ForgetPassword = (props) => {

    return(
      <div>
      <AppBar title="Reset Password" back={`/login`} />
      <div className="main">

      <Resetpassword token={props.match.params.token}  />
      </div>
      </div>
    )


}


export default ForgetPassword;
