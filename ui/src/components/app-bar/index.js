import React from 'react';
import {NavLink} from 'react-router-dom';

const AppBar = (props) => {

  return(
    <header>
    <span><NavLink to={props.back}> « </NavLink></span>
    <div className="title">{props.title}</div>
    </header>
  )
}

export default AppBar;
