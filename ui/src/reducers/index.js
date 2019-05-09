import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { singlestoryReducer,ownstoriesReducer,storiesReducer,favouritesReducer, pStoriesReducer } from './storiesReducer';
import { fetchUserById, fetchUsers, fetchUsername } from './user-reducer';
import {authReducer, meReducer} from './auth-reducers';

export const init = () => {
  const reducer = combineReducers({
    stories: storiesReducer,
    userById: fetchUserById,
    users: fetchUsers,
    form: formReducer,
    usernames: fetchUsername,
    auth: authReducer,
    favourites: favouritesReducer,
    me: meReducer,
    pStories: pStoriesReducer,
    ownstories: ownstoriesReducer,
    singlestory: singlestoryReducer
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));


  return store;
}
