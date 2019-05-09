
import React from 'react';
import {NavLink} from 'react-router-dom';

const query = (users,queryTerm) => {
  const foundUser = [];
  const name = queryTerm;

  if(users.length > 0 ) {
    users.map((user) => {
      if(user.fname || user.lname){
        const fullName = user.fname.toLowerCase() + ' ' + user.lname.toLowerCase();
        if(fullName.includes(name.toLowerCase()) || user.username.includes(name.toLowerCase()) || user.email.includes(name.toLowerCase())) {
          return foundUser.push(user);
        }
      } else {
        if(user.username.includes(name.toLowerCase()) || user.email.includes(name.toLowerCase())) {
            return foundUser.push(user);
        }
      }
      return true;
    })


    if(name === '') {
    foundUser.length = 0;
    return null;
    }


    if(foundUser.length === 0 ) {
      return (

        <div className="empty">
        <div>No People Found.</div>
        </div>

      )

    }else {
      return foundUser.reverse().map((user,index)=>{
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
          <div className="blkk">
          <div className="title">Stories</div>
          <div className="num">{user.stories.length}</div>
          </div>
          </NavLink>

        )
      })
    }


}
}

const People = ({users, searchName,errors}) => {

  if(errors) {
    if(errors.length === 0 && users.length === 0  ) {
      return (
        <div className="empty">
        <div> Sorry we're unable to process your request. </div>
        <div>Please Try Again later.</div>
        </div>
      )
    }
  }

  return(
    <div>
    {query(users,searchName)}
    </div>
  )
}

export default People;
