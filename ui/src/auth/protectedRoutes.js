
import React from 'react';
import {Route,Redirect} from 'react-router-dom';

import AuthService from '../services/auth-service';


const ProtectedRoutes = (props) => {

  const {component: Component, rest, computedMatch } = props;
  return(
    <Route params={computedMatch.params} {...rest} render={ (props) => {return AuthService.isAuthinticated()
      ? <Component  params={computedMatch} {...props} {...rest}/>
      : <Redirect to={{pathname:'/login'}} />
    }} />
  )
}

export default ProtectedRoutes;

//
// import React from 'react';
// import {Route,Redirect } from 'react-router-dom';
// import AuthService from '../services/auth-service';
//
//
// const ProtectedRoutes = (props) => {
//
//   const {component : Component, rest, computedMatch} = props;
//
//   return(
//     <Route params={computedMatch.params} {...rest} render={(props)=> AuthService.isAuthinticated()
//                               ? <Component params={computedMatch} {...props} {...rest} />
//                               : <Redirect to={{pathname: '/login'}} />} />
//   )
// }
//
//
// export default ProtectedRoutes;
