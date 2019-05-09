import React,{ Component } from 'react';
import Editstory from './editstory';
import AppBar from '../../app-bar';
import * as actions from '../../../actions';
import {connect} from 'react-redux';

class EditStory extends Component {
  componentDidMount() {


    this.props.dispatch(actions.editSingleStory(this.props.params.params.id));


  }

  renderErros(errors) {
      return(
        <div>
        <AppBar title="Edit Story" back={`/story/${this.props.params.params.id}`} />
        <div className="main">
        <div className="empty">
        <div>{errors[0].detail}</div>
        </div>
        </div>
        </div>

      )
    }


  render() {
    if (this.props.errors) {
       if(this.props.errors.length > 0) {
         return this.renderErros(this.props.errors);
       }
      }
    return(
      <div>
      <AppBar title="Edit Story" back={`/story/${this.props.params.params.id}`} />
      <div className="main">
      {this.props.story
      ? <Editstory id={this.props.params.params.id} title={this.props.story.title} description={this.props.story.description} public={this.props.story.public}/>
      :       <div className="loading"><i className="fa fa-spinner fa-spin"></i>Loading...</div>}
      </div>
      </div>
    )
  }

}

function mapStateToProps(state) {

  return {
    story:state.singlestory.data,
    errors:state.singlestory.errors,
    id: state.auth.id
  }
}
export default connect(mapStateToProps)(EditStory);
