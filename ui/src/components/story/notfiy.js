import React from 'react';
import {NavLink} from 'react-router-dom';

const Notify = (props) => {
	
	return(
		<div>



		{ props.me
			? 
				props.me.fname 
				? null
				: <NavLink to={{pathname:'/profile/edit'}} className="notify">
					<div className="rounded"><i className="far fa-user-circle"></i></div>
					<div className="title">Add Name</div>
					<div className="desc">Hey, what should I call You? Tell me Your Name ?</div>
				  </NavLink>				
			: null
		}

		{ props.me
			? 
				props.me.image
				? null
				: <NavLink to={{pathname:'/profile/edit'}} className="notify">
					<div className="rounded"><i className="fas fa-camera-retro" /></div>
					<div className="title">Add Photo</div>
					<div className="desc">Hey, Good-Looking You haven't uploaded your photo Yet...</div>
				  </NavLink>			
			: null
		}

		{props.me
			? props.me.stories.length === 0
				? <NavLink to={{pathname:'/story/add'}} className="notify">
					<div className="rounded"><i className="fas fa-file-signature"></i></div>
					<div className="title">Your First Story</div>
					<div className="desc">Hey{props.me.fname ? ' ' + props.me.fname : ''}, Write your first story. We're excited about it. Aren't You Excited about it?</div>
					</NavLink>	
				: null
			: null
		}
		

		</div>)
}

export default Notify;