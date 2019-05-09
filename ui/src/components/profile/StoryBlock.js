import React,{ Component} from 'react';
import Block from './block';
import * as actions from  '../../actions'
import {connect} from 'react-redux';




class StoryBlock extends Component{



  componentWillMount() {
    this.props.dispatch(actions.fetchMe());
    this.props.dispatch(actions.fetchOwnStories());
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
        <div>
        <Block  stories={this.props.stories} me={this.props.me} addFav={()=>this.props.addFav()} remStories={()=>this.props.remStories()} removeFav={()=>this.props.removeFav()} addPublics={()=>this.props.addPublics()} removePublics={()=>this.props.removePublics()}/>

        </div>


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
    stories: state.ownstories.data,
    errors: state.ownstories.errors,
    me: state.me.data
  }
}

export default connect(mapStateToProps)(StoryBlock);
