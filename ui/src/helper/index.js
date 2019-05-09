import moment from 'moment';
import AuthService from '../services/auth-service';

export const getTime = (date) => {
const now = Date.now();
const unixNow = moment(now).unix();
const givenTime = moment(date).unix();

const diffTime = unixNow - givenTime;

if(diffTime > 0 && diffTime < 60 ) {
  const time = `${diffTime}s`;
  return time;
} else if (diffTime > 60 && diffTime < 3600) {
 const time = moment(date).startOf('minute').fromNow();
 return time;
} else if ( diffTime >= 3600 && diffTime < 86400) {
  const time = moment(date).startOf('hour').fromNow();
  return time;
} else {
  const time = moment(date).format('lll');
  return time;
}

}


export const checkFav = (arr,id) => {
  console.log(arr,id);
  const newArr = [];
  if(arr.length > 0 ) {
   arr.map((item)=>{
      return newArr.push(item._id);
    })

    const i = newArr.indexOf(id);
    if(i > -1) {
      return true;
    }else {
      return false;
    }
  } else {
    return false;
  }

}


export const simCheckFav = (arr,id) => {
if(arr) {
  if(arr.length === 0) {
    return false;
  }else {
    const i = arr.indexOf(id);
    if(i > -1) {
      return true;
    }else {
      return false;
    }
  }
} else {
  return false;
}
}

export const checkWriter = (writer) => {

  if(AuthService.isAuthinticated()) {
    const id = AuthService.getId();
    if(id.toString() === writer._id.toString()) {
      return true;
    }
  }
  return false;
}

export const matchWriterStory = (me,story) => {
  console.log(me,story);

    if(story.public === true) {
      return true;
    }

    if(me._id.toString() === story.writer._id.toString()) {
      return true;
    }

    if(me._id.toString() !== story.writer._id.toString() && story.public === false) {
          return false;
    }



}
