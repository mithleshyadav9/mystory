import React from 'react';

import Header from '../header';
import NavBar from '../nav-bar';
import StoryBlock from '../story/StoryBlock';

const Search = () => {
  return(
    <div>
      <Header/>
      <NavBar/>
      <div className="main-home">

        <StoryBlock/>
      </div>

    </div>
  )
};

export default Search;
