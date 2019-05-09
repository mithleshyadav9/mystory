import React from 'react';
import AppBar from '../../app-bar';
import Profile from '../../profile';
import StoryBlock from './StoryBlock';

const UserProfile = (props) => {
  return(
    <div>
    <AppBar title="Profile" back="/home"/>
    <div className="main">
      <Profile navlink={false} user={props.user}/>
      <StoryBlock isAuth={props.isAuth} id={props.id}/>
    </div>
    </div>
  )
};

export default UserProfile;
