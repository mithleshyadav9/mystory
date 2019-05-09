import React,{ Component} from 'react';
import {getTime,simCheckFav,checkWriter} from '../../helper';
import {NavLink} from 'react-router-dom';


import * as actions from  '../../actions'
import {connect} from 'react-redux';




class StoryBlock extends Component{
  constructor(props) {
    super(props);

    this.state = {
      err: '',
      success: '',
      msg: '',
      id: '',
      stories: props.stories,
      me: props.me
    }
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
             console.log(this.props);
             this.props.remStories();
           }).then(()=>{

           }).catch((err)=>{
             this.setState({
               msg: err.response.data.errors[0].detail
             })
             const notification = document.querySelector('#notification');
             notification.classList.add('show');
             this.clearMsg();
           })
           const temp = this.state.stories;
           const i  = temp.findIndex(a => a._id.toString() === this.state.id.toString());
           if(i > -1) {
            temp.splice(i,1);
            this.setState({stories:temp});
           }
    this.choiceC();
    this.close();
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
        this.props.addFav();

      } else {
        fav.classList.add('far');
        fav.classList.remove('fas');
        fav.classList.remove('is');
        this.props.removeFav();

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
    },3500);
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
          this.props.addPublics();
        } else {

          p.classList.remove('out');
          this.props.removePublics();
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

renderEmpty() {
    return(
      <div className="empty">
      <div>Loading...</div>
      </div>
    )
  }

  renderErros(errors) {
      return(
        <div className="empty">
        <div>{errors[0].detail}</div>
        </div>
      )
    }

renderStories(stories) {

const me = this.props.me

    return stories.map( ( story, index )=>{

      return(
        <div className="blocks" key={index}>
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

          <NavLink to={{pathname: `/story/${story._id}`}} className="second-block">
            <div className="cont">
            <div className="desc">{story.description}</div>
            <div className="title"><span>{story.title}</span></div>
            </div>
            </NavLink>



          <div className="third-block">
          {this.props.me
          ? <div className="fade" onClick={()=>this.clickFavourite(me._id,story._id)}>{simCheckFav(me.favourites,story._id) ? <i id={`fav${story._id}`} className="fas fa-star is clickable"></i> : <i id={`fav${story._id}`} className="far fa-star clickable"></i>}</div>
          : null}

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
    });

  }

render() {





  if(this.props.stories) {

    if(this.props.stories.length > 0) {
      return (
        <div>
        {this.renderStories(this.state.stories)}
        <div id="story" className="some-menu">
        <div className="transparent"></div>
        <div className="none-trans">
        <div className="close-btn"><span onClick={()=>this.close()} id="user-close"><i className="fas fa-times"></i></span></div>
        <NavLink  className="link"  to={`/story/edit/${this.state.id}`}>Edit</NavLink>
        <div className="e-menu" onClick={()=>this.choice()} >Delete</div>
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
  }

}



};



export default connect(null)(StoryBlock);
