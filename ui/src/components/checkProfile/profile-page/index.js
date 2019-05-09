import React from 'react';
import AppBar from '../../app-bar';
import Profile from '../../profile';

import {Redirect} from 'react-router-dom';

const ProfilePage = (props) => {

  if(props.user) {

    if(!props.user.fname) {
      return(<Redirect to={{pathname:'/profile/edit'}}/>)
    }
    return(
      <div>
      <AppBar title="Profile" back="/home"/>
      <div className="main">
        <Profile navlink={true} user={props.user}/>

      </div>

      </div>
    )
  }
    





};

export default ProfilePage;
