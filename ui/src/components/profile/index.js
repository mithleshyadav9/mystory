import React,{Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import StoryBlock from './StoryBlock';



class Profile extends Component {
constructor(props) {
  super(props);

  this.state = {
    out: false,
    storys: props.user.stories.length,
    publics: props.user.publics.length,
    favourites: props.user.favourites.length
  }
}



addPublics() {

  const temp = this.state.publics;
  this.setState({storys: temp + 1});


}

remStories() {
  const temp = this.state.storys;
  const val = temp - 1;
  this.setState({storys: val});

}

removePublics() {
  const temp = this.state.publics;
  this.setState({publics: temp - 1});
}

addFav() {
  const temp = this.state.favourites;
  this.setState({favourites: temp + 1});
}

removeFav() {
  const temp = this.state.favourites;
  this.setState({favourites: temp - 1});
}



  open() {
    const menu = document.querySelector('#user');
    menu.style.transform = `translateY(0px)`;
  }

  close() {

    const menu = document.querySelector('#user');
    menu.style.transform = `translateY(calc(100vh - 50px))`;
  }

  logout() {
   this.props.dispatch(actions.logout());
  }

  render() {
    console.log(this.state);

    if(this.state.out) {
      return (
        <Redirect to={{ pathname: '/login'}} />
      )
  }

  const props = this.props;
if(props.user) {
  return(
    <div>
    <div className="profile-area">

      <div className="p-image">
      {props.navlink ? <div onClick={()=>this.open()} className="menu">•••</div> : null}
        <div className="img">
        {props.user.image ? <div className="pp" style={{background: `url(${props.user.image})`}}></div> : props.user.fname ? props.user.fname.slice(0,1) + '.' + props.user.lname.slice(0,1) + '.' : '?'}
        </div>
        <div className="name">{props.user.fname ? props.user.fname : 'No-'} {props.user.lname ? props.user.lname : '-Name'} {props.user.verified ? <i className="fas fa-check"></i> : null} </div>
        <div className="username">{props.user.username}</div>

        {props.navlink
          ? <NavLink to="/profile/edit" className="edit">Edit Profile</NavLink>
          : ''
        }
      </div>

      <div className="bio">
        {props.user.bio ? props.user.bio : 'No-Bio'}
      </div>

      <div className="website">
        {props.user.website ? <a href={props.user.website} rel="noopener noreferrer" target="_blank">{props.user.website}</a> : ''}
      </div>
    
      <div className="p-blocks">
        { props.navlink
          ? <div className="block">
            <div className="title">Stories</div>
            <div  className="num" >{props.user.stories ? this.state.storys : 0}</div>
          </div>
          : <div className="block">
            <div className="title" >Public</div>
            <div className="num">{props.user.stories ? props.user.stories.length : 0}</div>
          </div>
        }

        { props.navlink
          ? <NavLink to={`/public`} className="block">
            <div className="title" >Public</div>
            <div className="num">{props.user.publics ? this.state.publics : 0}</div>
          </NavLink>
          : <div className="block">
            <div className="title" >Public</div>
            <div className="num">{props.user.publics ? props.user.publics.length : 0}</div>
          </div>
        }


        { props.navlink
          ?
          <NavLink to={`/favourites`} className="block">
            <div className="title">Favourites</div>
            <div className="num">{props.user.favourites ? this.state.favourites : 0}</div>
          </NavLink>
          :
          <div className="block">
            <div className="title">Favourites</div>
            <div className="num">{props.user.favourites ? props.user.favourites.length : 0}</div>
          </div>
        }


      </div>
      {props.navlink
      ? <div id="user" className="some-menu">
      <div className="transparent"></div>
      <div className="none-trans">
      <div className="close-btn"><span onClick={()=>this.close()} id="user-close"><i className="fas fa-times"></i></span></div>
      <NavLink  className="link"  to="/story/add">Add Story</NavLink>
      <NavLink  className="link line"  to="/password/change"  > Change Password </NavLink>
      <div className="e-menu" onClick={()=>this.logout()} >Logout</div>
      </div>
      </div>
      : null}



    </div>
    {props.navlink
      ? <StoryBlock  addFav={()=>this.addFav()} remStories={()=>this.remStories()} removeFav={()=>this.removeFav()} addPublics={()=>this.addPublics()} removePublics={()=>this.removePublics()} />
      : ''}

    </div>
  )
}

}};


export default connect(null)(Profile);
