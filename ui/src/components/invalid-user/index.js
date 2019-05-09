import React from 'react';

import AppBar from '../app-bar';

const InvalidUser = (props) => {

  return(
    <div>
      <AppBar title={props.location.state.title} back={props.location.state.back} />
      <div className="main" >
      <div className="empty" >
      <div>
      You're Not Authorized to Access this Page.
      </div>
      </div>
      </div>
    </div>
  )
}

export default InvalidUser;
