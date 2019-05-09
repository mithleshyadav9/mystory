import axios from 'axios';
import AuthService from '../services/auth-service';
import AxiosService from '../services/axios-instance';
import {
        FETCH_STORIES_INIT,
        FETCH_STORIES_SUCCESS,
        FETCH_STORIES_FAIL,
        FETCH_USER_ID_INIT,
        FETCH_USER_ID_SUCCESS,
        FETCH_USER_ID_FAIL,
        FETCH_USERS_INIT,
        FETCH_USERS_SUCCESS,
        FETCH_USERS_FAIL,
        FETCH_USERNAMES_INIT,
        FETCH_USERNAMES_SUCCESS,
        FETCH_USERNAMES_FAIL,
        LOGIN_SUCCESS,
        LOGIN_INIT,
        LOGIN_FAIL,

        FETCH_FAVOURITES_INIT,
        FETCH_FAVOURITES_SUCCESS,
        FETCH_FAVOURITES_FAIL,
        FETCH_ME_INIT,
        FETCH_ME_SUCCESS,
        FETCH_ME_FAIL,
        FETCH_PSTORIES_INIT,
        FETCH_PSTORIES_SUCCESS,
        FETCH_PSTORIES_FAIL,
        FETCH_OWNSTORIES_INIT,
        FETCH_OWNSTORIES_SUCCESS,
        FETCH_OWNSTORIES_FAIL,
        FETCH_SINGLESTORY_INIT,
        FETCH_SINGLESTORY_SUCCESS,
        FETCH_SINGLESTORY_FAIL
       } from './type.js';

const STATIC_URL = 'http://localhost:3001/';

const axiosInstance = AxiosService.getInstance();

export const addImage = (image) => {
  const URL = `/user/image`;

  return axiosInstance.post(URL,image);
}

export const checkUsername = (username) => {

  const URL = `${STATIC_URL}api/v1/username/${username}`
  return axios.get(URL);
}

const fetchSingleStoryInit = () => {
  return {
    type: FETCH_SINGLESTORY_INIT
  }
}

const fetchSingleStorySuccess = (story)=> {

  return {
    type: FETCH_SINGLESTORY_SUCCESS,
    story
  }
}

const fetchSingleStoryFail = (errors) => {
  return {
    type: FETCH_SINGLESTORY_FAIL,
    errors
  }
}



export const fetchSingleStory = (id) => {
  const URL = `${STATIC_URL}api/v1/story/story/${id}`;
  return dispatch => {
    dispatch(fetchSingleStoryInit());

    if(AuthService.isAuthinticated()) {
      return axiosInstance.get(`/story/story/${id}`)
           .then(res => res.data)
           .then(story => dispatch(fetchSingleStorySuccess(story)))
           .catch((data) => {

            return dispatch(fetchSingleStoryFail(data.response.data.errors))
           })
    }

  return  axios.get(URL)
         .then(res => res.data)
         .then(story => dispatch(fetchSingleStorySuccess(story)))
         .catch((data) => {

           return dispatch(fetchSingleStoryFail(data.response.data.errors))
         })
  }
}


const fetchStoriesInit = () => {
  return {
    type: FETCH_STORIES_INIT
  }
}

const fetchStoriesSuccess = (stories)=> {
  return {
    type: FETCH_STORIES_SUCCESS,
    stories
  }
}

const fetchStoriesFail = (errors) => {
  return {
    type: FETCH_STORIES_FAIL,
    errors
  }
}



export const fetchStories = (id) => {
  const URL = `${STATIC_URL}api/v1/story/stories/${id}`;
  return dispatch => {
    dispatch(fetchStoriesInit());

    axios.get(URL)
         .then(res => res.data)
         .then(stories => dispatch(fetchStoriesSuccess(stories)))
         .catch((data) => {


           dispatch(fetchStoriesFail(data.response.data.errors))
         })
  }
}

const fetchUserByIdInit = () => {
  return {
    type: FETCH_USER_ID_INIT
  }
}

const fetchUserByIdSuccess = (user) => {

  return {
    type: FETCH_USER_ID_SUCCESS,
    user
  }
}

const fetchUserByIdFail = (errors) => {

  return {
    type: FETCH_USER_ID_FAIL,
    errors
  }
}


export const fetchUserById = (id) => {
  const URL = `${STATIC_URL}api/v1/user/${id}`;

  return dispatch => {
    dispatch(fetchUserByIdInit())

    axios.get(URL)
         .then(res => res.data)
         .then(user => dispatch(fetchUserByIdSuccess(user)))
         .catch((err)=>{
           return dispatch(fetchUserByIdFail(err.response.data.errors))
         })
  }
}




const fetchUsersInit = () => {
  return {
    type: FETCH_USERS_INIT
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    users
  }
}

const fetchUsersFail = (errors) => {
  return {
    type: FETCH_USERS_FAIL,
    errors
  }
}

export const fetchUsers = () => {
  const URL = `${STATIC_URL}api/v1/users`;

  return dispatch => {
    dispatch(fetchUsersInit());

    axios.get(URL)
         .then(res => res.data)
         .then(users => dispatch(fetchUsersSuccess(users)))
         .catch((data)=>{
           return dispatch(fetchUsersFail(data.response.data.errors))
         })

  }
}


const fetchUsernamesInit = () => {
  return {
    type: FETCH_USERNAMES_INIT
  }
}

const fetchUsernamesSuccess = (usernames) => {
  return {
    type: FETCH_USERNAMES_SUCCESS,
    usernames
  }
}

const fetchUsernamesFail = (errors) => {
  return {
    type: FETCH_USERNAMES_FAIL,
    errors
  }
}

export const fetchUsernames = () => {
  const URL = `${STATIC_URL}api/v1/usernames`;
  return dispatch => {
    dispatch(fetchUsernamesInit());

    axios.get(URL)
         .then(res => res.data)
         .then(usernames => dispatch(fetchUsernamesSuccess(usernames)))
         .catch((err)=>{
           dispatch(fetchUsernamesFail(err.response.data.errors))
         })
  }
}


export const registerUser = (user) => {
  const URL = `${STATIC_URL}api/v1/user`;

  return axios.post(URL,user)
}

const loginInit = () => {
  return{
    type:LOGIN_INIT
  }
}

const loginSuccess = () => {
  const id = AuthService.getId();

  return {
    type: LOGIN_SUCCESS,
    id
  }
}

const loginFail = (errors) => {


  return {
    type: LOGIN_FAIL,
    errors
  }
}

export const login = (user) => {
  const URL = `${STATIC_URL}api/v1/login`;


return dispatch => {
  dispatch(loginInit());

  axios.post(URL,user)
            .then(res => res.data)
            .then((token) => {

                AuthService.saveToken(token.token);
                dispatch(loginSuccess());
            })
            .catch((err)=>{
              dispatch(loginFail(err.response.data.errors));
            })

}
}


export const clearLogin = () => {
  return {
    type: LOGIN_INIT
  }
}

export const logout = () => {
  AuthService.invalidateUser();
  return dispatch => {
    dispatch(loginInit());
  }
}



export const checkAuth = () => {
  if(AuthService.isAuthinticated()) {
    return dispatch => {
      dispatch(loginSuccess());
    } } else {
      return dispatch => {
        dispatch(loginInit());
      }
    }
  }




export const updateProfile = (info) => {
    const URL = `/info`;

    return axiosInstance.post(URL,info);

  }


const fetchFavouriteInit = () => {
  return {
    type:FETCH_FAVOURITES_INIT
  }
}

const fetchFavouriteSucces = (favourites) => {
  return {
    type:FETCH_FAVOURITES_SUCCESS,
    favourites
  }
}

const fetchFavouriteFail = (errors) => {
  return {
    type:FETCH_FAVOURITES_FAIL,
    errors
  }
}


export const fetchFavourites = () => {
  const URL = `/favourites`;

  return dispatch => {
    dispatch(fetchFavouriteInit());

    axiosInstance.get(URL)
                 .then(res => res.data)
                 .then(favourites => dispatch(fetchFavouriteSucces(favourites)))
                 .catch((err) => {
                   dispatch(fetchFavouriteFail(err.response.data.errors))
                 })
  }
}


export const writeStory = (story) => {
  const URL = `/story/write`;

  return axiosInstance.post(URL,story)

}


const fetchMeInit =()=>{
  return{
    type: FETCH_ME_INIT
  }
}

const fetchMeSuccess = (user) => {
  return {
    type: FETCH_ME_SUCCESS,
    user
  }
}

const fetchMeFail = (errors) => {
  return {
    type: FETCH_ME_FAIL,
    errors
  }
}

export const fetchMe = () => {
  const URL = `/me`;

  return dispatch => {

      dispatch(fetchMeInit());
    axiosInstance.get(URL)
                 .then(res => res.data)
                 .then(user => dispatch(fetchMeSuccess(user)))
                 .catch((err)=>{
                   return dispatch(fetchMeFail(err.response.data.errors))
                 })
  }
}


export const storyFav = (id) => {
  const URL = `/story/favourite/${id}`;

  return axiosInstance.patch(URL);
}

export const storyPublic = (id) => {
  const URL = `/story/public/${id}`;

  return axiosInstance.patch(URL);
}



const fetchPStoriesInit = () => {
  return {
    type: FETCH_PSTORIES_INIT
  }
}

const fetchPStoriesSuccess = (stories) => {
  return {
    type: FETCH_PSTORIES_SUCCESS,
    stories
  }
}

const fetchPStoriesFail = (errors) => {
  return {
    type: FETCH_PSTORIES_FAIL,
    errors
  }
}

export const fetchPStories = () => {
  const URL = `${STATIC_URL}api/v1/story/pstories`;

  return dispatch => {
    dispatch(fetchPStoriesInit())

    axios.get(URL)
         .then(res=>res.data)
         .then(stories => dispatch(fetchPStoriesSuccess(stories)))
         .catch((err)=>{
           return dispatch(fetchPStoriesFail(err.response.data.errors))
         })
  }
}

const fetchOwnStoriesInit = () => {
  return {
    type: FETCH_OWNSTORIES_INIT
  }
}

const fetchOwnStoriesSuccess = (stories) => {
  return {
    type: FETCH_OWNSTORIES_SUCCESS,
    stories
  }
}

const fetchOwnStoriesFail = (errors) => {
  return {
    type: FETCH_OWNSTORIES_FAIL,
    errors
  }
}

export const fetchOwnStories = () => {
  const URL = `/story/stories`;

  return dispatch => {
    dispatch(fetchOwnStoriesInit())

    axiosInstance.get(URL)
         .then(res=>res.data)
         .then(stories => dispatch(fetchOwnStoriesSuccess(stories)))
         .catch((err)=>{
           return dispatch(fetchOwnStoriesFail(err.response.data.errors))
         })
  }
}

export const storyEdit = (id,story) => {
  const URL = `/story/story/${id}`;

  return axiosInstance.patch(URL,story)
}


export const editSingleStory = (id) => {
  const URL = `/story/editstory/${id}`;

  return dispatch => {
    dispatch(fetchSingleStoryInit());

    return axiosInstance.get(URL)
         .then(res => res.data)
         .then(story => dispatch(fetchSingleStorySuccess(story)))
         .catch((data) => {

          return dispatch(fetchSingleStoryFail(data.response.data.errors))
         })

  }
}


 export const deleteStory = (id) => {
   const URL = `/story/delete/${id}`;

   return axiosInstance.delete(URL);
 }


 export const updatePassword = (password) => {
   const URL = `/user/change/password`;

   return axiosInstance.post(URL,password);
 }


export const requestForgetPassword = (email) => {
  const URL = `${STATIC_URL}api/v1/request/reset/password`;

  return axios.post(URL,email);
}


export const resetPassword = (password) => {

const URL = `${STATIC_URL}api/v1/reset/password`;

return axios.post(URL, password);
}
