
import React,{Component} from 'react';
import { Route, Redirect } from 'react-router-dom';


import * as actions from  '../actions';
import {connect} from 'react-redux';
import {matchWriterStory} from '../helper';
import AuthService from '../services/auth-service';

class PrivateStoryRoutes extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchMe());
    this.props.dispatch(actions.fetchSingleStory(this.props.computedMatch.params.id));
  }

  render() {
    console.log(this);
    const id = this.props.computedMatch.params.id;

    const props = this.props;
    console.log(this.props.me);
    const {component: Component, computedMatch, rest } = this.props
    if(this.props.story) {
      return (
      <Route params={computedMatch.params} {...rest} render={ (props) => {
        return matchWriterStory(this.props.me,this.props.story)
        ? <Component params={computedMatch} {...this.props}  {...rest} />
        : AuthService.isAuthinticated() ? null : <Redirect to={{pathname: '/login'}} />
      }} >

      </Route>
    )
  } else {
    return (<div></div>)
  }

  }
}

function mapStateToProps(state) {
  return {
    me: state.me.data,
    story:state.singlestory.data
  }
}


export default connect(mapStateToProps)(PrivateStoryRoutes);
