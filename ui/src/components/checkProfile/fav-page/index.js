import React from 'react';
import AppBar from '../../app-bar';
import StoryBlock from './StoryBlock';





const FavPage = (props) => {



  return(
    <div>
    <AppBar title="Favourites" back={`/profile/${props.id}`}/>
    <div className="main">
    <StoryBlock />

    </div>
    </div>
  )

};



export default FavPage;
