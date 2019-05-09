import React from 'react';
import { NavLink } from 'react-router-dom';

import {connect} from 'react-redux';

const NavBar = ({id}) => {
  return(
    <div className="container">
    <NavLink to="/home" ><i className="fas fa-home"></i></NavLink>
    <NavLink to="/search"><i className="fas fa-search"></i></NavLink>
    <NavLink to={`/profile/${id}`}><i className="fas fa-user"></i></NavLink>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    id: state.auth.id
  }
}

export default connect(mapStateToProps)(NavBar);
