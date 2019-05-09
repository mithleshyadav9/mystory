import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/home';
import Search from './components/search';
import FavPage from './components/checkProfile/fav-page';
import CheckProfile from './components/checkProfile';
import SignUp from './components/signup';
import LogIn from './components/login';
import EditProfile from './components/checkProfile/edit-p';
import ChangePassword from './components/checkProfile/changep';
import ForgetPassword from './components/forgetpassword';
import ResetPassword from './components/resetpassword';
import InvalidUser from './components/invalid-user';
import Banner from './components/banner';
import AddStory from './components/checkProfile/add-story';
import EditStory from './components/checkProfile/edit-story';
import SingleStory from './components/singlestory';
import CheckUsername from './components/checkUsername';

import { connect } from 'react-redux';
import * as actions from './actions';

import ProtectedRoutes from './auth/protectedRoutes';


class App extends Component {
  componentWillMount() {
    this.props.dispatch(actions.checkAuth());

  }

  render(){

    return(

    <div>
    <BrowserRouter>
    <Switch>
    <ProtectedRoutes exact path="/profile/edit" component={EditProfile} />
    <ProtectedRoutes exact path="/password/change" component={ChangePassword} />
    <ProtectedRoutes exact path="/story/add" component={AddStory} />
    <ProtectedRoutes exact path="/story/edit/:id" component={EditStory} />
    <Route exact path="/profile/:id" component={CheckProfile} />
    <Route exact path="/forget/password" component={ForgetPassword} />
    <Route exact path="/reset/password/:token" component={ResetPassword} />
    <Route exact path="/story/:id" component={SingleStory} />
    <ProtectedRoutes exact path="/favourites" component={()=><FavPage id={this.props.id}/>} />
    <ProtectedRoutes exact path="/home" component={Home} />
    <ProtectedRoutes exact path="/search" component={Search} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/login"  component={LogIn}/>
    <ProtectedRoutes exact path="/invalid/user"  component={InvalidUser}/>
    <Route exact path="/:username" component={CheckUsername} />
    <Route exact path="/" component={()=>this.props.isAuth ? <Redirect to={{pathname:'/home'}} /> : <Banner/>} />
    </Switch>
    </BrowserRouter>
    </div>

  )
}
}


function mapStateToProps(state) {

  return {
    isAuth: state.auth.isAuth,
    id: state.auth.id
  }
}
export default connect(mapStateToProps)(App);
