import React,{ Component} from 'react';
import Block from './Block';

import * as actions from  '../../actions'
import {connect} from 'react-redux';




class StoryBlock extends Component{



  componentWillMount() {
    this.props.dispatch(actions.fetchMe());
    this.props.dispatch(actions.fetchPStories());
  }



  renderErros(errors) {
      return(
        <div className="empty">
        <div>{errors[0].detail}</div>
        </div>
      )
    }


render() {
 


  if (this.props.errors) {
   if(this.props.errors.length > 0) {
     return this.renderErros(this.props.errors);
   }
 }

  if(this.props.stories && this.props.me) {
    if(this.props.stories.length > 0) {
      return (
        <Block stories={this.props.stories} me={this.props.me} />

      )
    }
  }
    return (
      <div className="loading">
      <i className="fa fa-spinner fa-spin"></i>Loading...
      </div>
    )

}



};

function mapStateToProps(state) {

  return {
    stories: state.pStories.data,
    errors: state.pStories.errors,
    me: state.me.data
  }
}

export default connect(mapStateToProps)(StoryBlock);
