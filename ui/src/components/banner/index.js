import React from 'react';
import {NavLink} from 'react-router-dom';

const Banner = () => {
  return(
    <div className="blk">
     <div className="banner">
     <div className="logo">MY story</div>
     <div className="desc">"Deep within our hearts We believe Everybody has a story. Write Down here and We promise we won't tell anyone...! "</div>
     </div>
     <div className="links">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
     </div>

    </div>
  )
}

export default Banner;
