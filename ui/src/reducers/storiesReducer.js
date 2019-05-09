import { FETCH_STORIES_INIT,
         FETCH_STORIES_SUCCESS,
         FETCH_STORIES_FAIL,
         FETCH_FAVOURITES_INIT,
         FETCH_FAVOURITES_SUCCESS,
         FETCH_FAVOURITES_FAIL,
         FETCH_PSTORIES_INIT,
         FETCH_PSTORIES_SUCCESS,
         FETCH_PSTORIES_FAIL,
         FETCH_OWNSTORIES_INIT,
         FETCH_OWNSTORIES_SUCCESS,
         FETCH_OWNSTORIES_FAIL,
         FETCH_SINGLESTORY_INIT,
         FETCH_SINGLESTORY_SUCCESS,
         FETCH_SINGLESTORY_FAIL} from '../actions/type.js';


const INITIAL_STATE = {
  stories: {
    data: [],
    errors: []
  },
  singlestory: {
    data: null,
    errors: []
  },
  ownstories: {
    data: [],
    errors: []
  },
  favourites: {
    data:[],
    errors:[]
  },
  public: {
    data:[],
    errors:[]
  }
}

export const singlestoryReducer = (state = INITIAL_STATE.singlestory,action) => {
  switch (action.type) {
    case FETCH_SINGLESTORY_INIT:
    return {...state,data:null,errors:[]}

    case FETCH_SINGLESTORY_SUCCESS:
      return {...state,data:action.story,errors:[]}

    case FETCH_SINGLESTORY_FAIL:
      return {...state,data:null,errors:action.errors}

    default:
    return state;

  }
}


export const ownstoriesReducer = (state = INITIAL_STATE.ownstories,action) => {
  switch (action.type) {
    case FETCH_OWNSTORIES_INIT:
    return {...state,data:[],errors:[]}

    case FETCH_OWNSTORIES_SUCCESS:
      return {...state,data:action.stories,errors:[]}

    case FETCH_OWNSTORIES_FAIL:
      return {...state,data:[],errors:action.errors}

    default:
    return state;

  }
}

export const storiesReducer = (state = INITIAL_STATE.stories,action) => {
  switch (action.type) {
    case FETCH_STORIES_INIT:
    return {...state,data:[],errors:[]}

    case FETCH_STORIES_SUCCESS:
      return {...state,data:action.stories,errors:[]}

    case FETCH_STORIES_FAIL:
      return {...state,data:[],errors:action.errors}

    default:
    return state;

  }
}


export const favouritesReducer = (state = INITIAL_STATE.favourites,action) => {
  switch (action.type) {
    case FETCH_FAVOURITES_INIT:
    return {...state,data:[],errors:[]}

    case FETCH_FAVOURITES_SUCCESS:
      return {...state,data:action.favourites,errors:[]}

    case FETCH_FAVOURITES_FAIL:
      return {...state,data:[],errors:action.errors}

    default:
    return state;

  }
}

export const pStoriesReducer = (state = INITIAL_STATE.public,action) => {
  switch (action.type) {
    case FETCH_PSTORIES_INIT:
     return {...state,data:[],errors:[]}

     case FETCH_PSTORIES_SUCCESS:
      return {...state,data:action.stories,errors:[]}

      case FETCH_PSTORIES_FAIL:
       return {...state,data:[],errors:action.errors}


    default:
    return state;

  }
}
