import React from 'react';
import Forgetpassword from './forgetpassword';

import AppBar from '../app-bar';




const ForgetPassword = () => {

    return(
      <div>
      <AppBar title="Forget Password" back={`/login`} />
      <div className="main">

      <Forgetpassword  />
      </div>
      </div>
    )


}


export default ForgetPassword;
