
import {
        FETCH_USER_ID_INIT,
        FETCH_USER_ID_SUCCESS,
        FETCH_USER_ID_FAIL,
        FETCH_USERS_INIT,
        FETCH_USERS_SUCCESS,
        FETCH_USERS_FAIL,
        FETCH_USERNAMES_INIT,
        FETCH_USERNAMES_SUCCESS,
        FETCH_USERNAMES_FAIL
       }      from '../actions/type.js';


const INITIAL_STATE = {
  user: {
    data: null,
    errors: []
  },
  users: {
    data:[],
    errors: []
  },
  usernames: {
    data: [],
    errors:[]
  }
}

export const fetchUserById = (state = INITIAL_STATE.user ,action) => {
  switch (action.type) {
    case FETCH_USER_ID_INIT:
      return {...state,data:null,errors:[]}

    case FETCH_USER_ID_SUCCESS:
      return {...state,data:action.user,errors:[]}

    case FETCH_USER_ID_FAIL:
      return {...state,data:null,errors:action.errors}


    default:
      return state;
  }
}

export const fetchUsers = (state = INITIAL_STATE.users,action) => {
  switch (action.type) {
    case FETCH_USERS_INIT:
      return {...state,data:[],errors:[]}

    case FETCH_USERS_SUCCESS:
      return {...state,data:action.users,errors:[]}


    case FETCH_USERS_FAIL:
      return {...state,data:[],errors:action.errors}


    default:
      return state;

  }
}



export const fetchUsername = (state = INITIAL_STATE.usernames,action) => {
 switch (action.type) {
   case FETCH_USERNAMES_INIT:
    return {...state,data:[],errors:[]}

    case FETCH_USERNAMES_SUCCESS:
     return {...state,data:action.usernames,errors:[]}

     case FETCH_USERNAMES_FAIL:
      return {...state,data:[],errors:action.errors}

   default:
    return state;
 }
}
