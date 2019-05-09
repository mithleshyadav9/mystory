import {
  LOGIN_SUCCESS,
  LOGIN_INIT,
  LOGIN_FAIL,
  FETCH_ME_INIT,
  FETCH_ME_SUCCESS,
  FETCH_ME_FAIL
} from '../actions/type.js';

const INITIAL_STATE = {
  auth: {
    isAuth: false,
    id: '',
    errors: []
  },
  me: {
    data:null,
    errors:[]
  }
}

export const authReducer = (state = INITIAL_STATE.auth,action) => {
  switch (action.type) {
    case LOGIN_INIT:
    return {...state,isAuth:false,id: '',errors:[]}

    case LOGIN_SUCCESS:
    return {...state,isAuth:true,id: action.id,errors:[]}

    case LOGIN_FAIL:
    return {...state,isAuth:false,id: '',errors:action.errors}


    default:
    return state;

  }
}

export const meReducer = (state = INITIAL_STATE.me,action) => {
  switch (action.type) {
    case FETCH_ME_INIT:
    return {...state,data:null,errors:[]}

    case FETCH_ME_SUCCESS:
    return {...state,data: action.user,errors:[]}

    case FETCH_ME_FAIL:
    return {...state,data:null,errors:action.errors}



    default:
    return state;

  }
}
