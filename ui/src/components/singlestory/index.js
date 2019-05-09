import React,{Component} from 'react';
import AppBar from '../app-bar';
import StoryBlock from './StoryBlock';
import * as actions from '../../actions';
import {connect} from 'react-redux';


class SingleStory extends Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchSingleStory(this.props.match.params.id));
  }

  renderErros(errors) {
      return(
        <div className="empty">
        <div>{errors[0].detail}</div>
        </div>
      )
    }

    renderLoading() {
        return(
          <div className="loading">
            <div><i className="fa fa-spinner fa-spin" />Loading...</div>
            </div>
        )
      }

  render() {

    if(this.props.story ) {
    return(
      <div>
      <AppBar title={this.props.story ? this.props.story.title : 'Story' } back={this.props.story ? `/profile/${this.props.story.writer._id}` : '/home'}/>
      <div className="main">
      <StoryBlock isAuth={this.props.isAuth} story={this.props.story}  />
       </div>
      </div>
    )
  }





    return(
      <div>
      <AppBar title="Story" back="/home"/>
      <div className="main">

      { this.props.errors ? this.props.errors.length > 0
        ? this.renderErros(this.props.errors)
        : this.renderLoading()
        : this.renderLoading()

       }

      </div>
      </div>
    )




  }

}

function mapStateToProps(state) {

  return {
    story: state.singlestory.data,
    errors: state.singlestory.errors,
    isAuth: state.auth.isAuth
  }
}


export default connect(mapStateToProps)(SingleStory);
