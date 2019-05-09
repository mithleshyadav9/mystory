import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import AuthService from '../services/auth-service';


const PrivateRoutes = (props) => {
  const id = props.computedMatch.params.id;
  const link = `/profile/${id}`;
    const {component: Component, computedMatch, rest } = props;
  return (
    <Route params={computedMatch.params} {...rest} render={(props)=> {
      return AuthService.matchId(id)
      ? <Component params={computedMatch} {...rest} {...props} />
      : <Redirect to={{ pathname: '/invalid/user',state: {title: 'Favourites',back: link }}} />
    }} />
  )
}


export default PrivateRoutes;
