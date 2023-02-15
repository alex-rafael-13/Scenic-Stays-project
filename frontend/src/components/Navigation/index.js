import React, {useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from'./logo-image/logo-image.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const ulRef = useRef()
  
  return (
    <div className='header'>
      <div className='header-contents'>
        <div className='logo-container'>
          <NavLink exact to="/">
            <img src={logo}/>
          </NavLink>
        </div>
        {isLoaded && (
          <div className='profile-container'>
            <div className='message' ref={ulRef}>
            {sessionUser ?
              (<div>Welcome {sessionUser.firstName}!</div>) : (<div>Sign In or Sign Up!</div>)}
            </div> 
            <div>
              <ProfileButton user={sessionUser} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;