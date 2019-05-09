import React,{ Component} from 'react';
import {getTime,simCheckFav,checkWriter} from '../../helper';
import {NavLink } from 'react-router-dom';

import * as actions from  '../../actions'
import {connect} from 'react-redux';




class StoryBlock extends Component{
  constructor(props) {
    super(props);

    this.state = {
      err: '',
      success: '',
      msg: '',
      id:'',
      favCount: props.story.favBy.length,
      favBy: props.story.favBy
    }
  }

componentWillMount() {
  this.props.dispatch(actions.fetchMe());
}

open(id) {
  this.setState({id:id});
  const menu = document.querySelector('#story');
  menu.style.transform = `translateY(0px)`;
}

close() {
  this.setState({id:''});
  const menu = document.querySelector('#story');
  menu.style.transform = `translateY(calc(100vh - 50px))`;
}

choice() {
  const choice = document.querySelector('#choice');
  choice.style.transform = `translateY(0px)`;

}

choiceC() {
  const choice = document.querySelector('#choice');
  choice.style.transform = `translateY(calc(100vh - 50px))`;

}

openFav() {
  const menu = document.querySelector('#favp');
  menu.style.transform = `translateY(0px)`;


}

renderPeoples() {
  const peoples = this.state.favBy;
  return peoples.map((user,index)=>{
    return(
        <NavLink to={`/profile/${user._id}`} key={index} className="people">
          <div className="lft">
          <div className="people-img">
          {user.image ? <div className="pp" style={{background: `url(${user.image})`}}></div> : user.fname ? <div> {user.fname.slice(0,1).toUpperCase() + '.' + user.lname.slice(0,1).toUpperCase() + '.'} </div> : <div>N.N.</div>}

          </div>
          <div className="detail">
          <div className="name">
          {user.fname ? user.fname : 'No-'} {user.lname ? user.lname : '-Name'} {user.verified ? <i className="fas fa-check"></i> : null}
          </div>
          <div className="username">{user.username}</div>
          </div>
          </div>
          </NavLink>
      )
  })
}


closeP() {

  const menu = document.querySelector('#favp');
  menu.style.transform = `translateY(calc(100vh - 50px))`;
}

delete() {
  actions.deleteStory(this.state.id)
         .then(res=>res.data)
         .then((res) => {
           this.setState({
             msg: res.msg
           })
           const notification = document.querySelector('#notification');
           notification.classList.add('show');
           this.clearMsg();
         }).catch((err)=>{
           this.setState({
             msg: err.response.data.errors[0].detail
           })
           const notification = document.querySelector('#notification');
           notification.classList.add('show');
           this.clearMsg();
         })
  this.choiceC();
  this.close();
}


notuserFav() {
  this.setState({
    msg: 'Please Login to add story to your Favourites.'
  })
  const notification = document.querySelector('#notification');
  notification.classList.add('show');
  this.clearMsg();
}





  clickFavourite(uid,id) {

      actions.storyFav(id).then((res)=>{

        this.setState({
          msg: res.data.msg
        })
        const notification = document.querySelector('#notification');
        notification.classList.add('show');
        return {id,res:res.data.res};
      }).then((id)=>{

        const fav = document.querySelector(`#fav${id.id}`);

        if(id.res === true) {

          fav.classList.remove('far');
          fav.classList.add('fas');
          fav.classList.add('is');
          const count = this.state.favCount || 0;

          this.setState({favCount: count + 1});
          this.setState({
            favBy: [...this.state.favBy,{_id:this.props.me._id,fname:this.props.me.fname,lname:this.props.me.lname,image:this.props.me.image,username:this.props.me.username,verified:this.props.me.verified}]
          });
        } else {
          fav.classList.add('far');
          fav.classList.remove('fas');
          fav.classList.remove('is');
          const count = this.state.favCount || 0;
          this.setState({favCount: count - 1});
          const temp = this.state.favBy;
          const i = temp.findIndex(a => a._id.toString() === this.props.me._id.toString());
          if(i > -1) {
            temp.splice(i,1);
          }

          this.setState({
            favBy: temp
          })
        }


      }).catch((res)=>{
        this.setState({
          msg: 'Sorry An Error occurred processing your request.'
        })
        const notification = document.querySelector('#notification');
        notification.classList.add('show');
      })
      // this.props.dispatch(actions.fetchMe());
      // this.props.dispatch(actions.fetchPStories());
      this.clearMsg();
  // console.log(this);
  //     actions.fetchUserById(uid));
    }

    clearMsg() {
      setTimeout(()=>{
        const notification = document.querySelector('#notification');
        if(notification.classList.contains('show')){
          notification.classList.remove('show');
        }
      },3000);
    }


    clickPublic(id) {

        actions.storyPublic(id).then((res)=>{

          this.setState({
            msg: res.data.msg
          })
          const notification = document.querySelector('#notification');
          notification.classList.add('show');
          return {id,res:res.data.res};
        }).then((id)=>{
          const p = document.querySelector(`#p${id.id}`);

          if(id.res === true) {
            p.classList.add('out');
          } else {

            p.classList.remove('out');
          }


        }).catch((res)=>{
          this.setState({
            msg: 'Sorry An Error occurred processing your request.'
          })
          const notification = document.querySelector('#notification');
          notification.classList.add('show');
        })
        this.clearMsg();
      }




renderStories(story) {
  const me = this.props.me;


      return(
        <div className="blocks">
          <div className="first-block">
            <div className="section-one">
            <NavLink to={`/profile/${story.writer._id}`} className="profile-image">
            {story.writer.image ? <div className="pp" style={{background: `url(${story.writer.image})`}}></div> : story.writer.fname ? <div className="img-nm"> {story.writer.fname.slice(0,1) + '.' + story.writer.lname.slice(0,1) + '.'} </div> : <div className="img-nm">&nbsp; &nbsp;?</div>}
            </NavLink>
            <NavLink  to={`/profile/${story.writer._id}`} className="name">{story.writer.fname ?   story.writer.fname : 'No-Name'}</NavLink>
            </div>

            <div className="section-two">
                <div className="time">{getTime(story.wroteOn)}</div>

          {checkWriter(story.writer)
          ? <div onClick={()=>{this.open(story._id)}} className="options">•••</div>
          : null}
            </div>
          </div>

          <div className="story-part">
            <div className="story">
            <div className="title"><span>{story.title}</span></div>
            <div className="desc">{story.description}</div>
            </div>
          </div>

          { this.state.favCount > 0
            ? checkWriter(story.writer)
              ?   <div onClick={()=>this.openFav()} className="peoples link"> {this.state.favCount} {this.state.favCount > 1 ? 'peoples' : 'people'} has added this story to favourites. </div> 
              :  <div className="peoples"> {this.state.favCount} {this.state.favCount > 1 ? 'peoples' : 'people'} has added this story to favourites. </div>
            : null }


          <div className="third-block">
          {this.props.me
          ? <div className="fade" onClick={()=>this.clickFavourite(me._id,story._id)}>{simCheckFav(me.favourites,story._id) ? <i id={`fav${story._id}`} className="fas fa-star is clickable"></i> : <i id={`fav${story._id}`} className="far fa-star clickable"></i>}</div>
          : <div onClick={()=>this.notuserFav()}><i className="far fa-star clickable"></i></div>}
                    <div></div>

                    {checkWriter(story.writer)
                     ? <div onClick={()=>this.clickPublic(story._id)}>{story.public ? <i id={`p${story._id}`} className="fas fa-globe-asia clickable out"></i> : <i id={`p${story._id}`} className="fas fa-globe-asia clickable"></i>}</div>
                     : <div>{story.public ? <i className="fas fa-globe-asia out"></i> : <i className="fas fa-globe-asia"></i>}</div>}
                    </div>





          <div id="notification" className="notification">
          <span><i className="far fa-bell" ></i> &nbsp;&nbsp;{this.state.msg}</span>
          </div>
        </div>
      )


  }

render() {

  if(this.props.story) {
      return(
        <div>
        {this.renderStories(this.props.story)}
        <div id="story" className="some-menu">
        <div className="transparent"></div>
        <div className="none-trans">
        <div className="close-btn"><span onClick={()=>this.close()} id="user-close"><i className="fas fa-times"></i></span></div>
        <NavLink  className="link"  to={`/story/edit/${this.state.id}`}>Edit</NavLink>
        <div className="e-menu" onClick={()=>this.choice()} >Delete</div>
        </div>
        </div>


        <div id="favp" className="some-menu">
        <div className="none-trans people">
        <div className="close-btn"><span onClick={()=>this.closeP()} id="user-close"><i className="fas fa-times"></i></span></div>
        <div className="people-block">
        {this.renderPeoples()}
        </div>
        </div>
        </div>

        <div id="choice" className="some-menu">
        <div className="transparent"></div>
        <div className="none-trans">
        <div className="info">Do you Really Want to Delete this Story?</div>
        <div className="choice" onClick={()=>this.delete()} >Yes, Sure.</div>
        <div className="choice c" onClick={()=>this.choiceC()} >Cancel</div>
        </div>
        </div>
        </div>
      )
  }

    return (
      <div className="loading"><i className="fa fa-spinner fa-spin"></i>Loading...</div>
    )

}



};

function mapStateToProps(state) {

  return {
    me: state.me.data
  }
}

export default connect(mapStateToProps)(StoryBlock);
