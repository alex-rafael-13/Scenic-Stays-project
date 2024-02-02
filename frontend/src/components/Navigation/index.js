import React, {useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import logo from'./logo-image/logo-image.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const ulRef = useRef()

  //LOGO URL
  const LOGO = "https://scenic-stays.s3.us-west-1.amazonaws.com/public/logo-image.png"
  
  return (
    <div className='header'>
      <div className='header-contents'>
        <div className='logo-container'>
          <NavLink to="/" >
            <img src={LOGO}/>
          </NavLink>
        </div>
        {isLoaded && (
          <div className='profile-container'>
            {sessionUser && (
              <NavLink to='/spots/new'>
                <div className='message' ref={ulRef}>
                  Create a new spot!
                </div> 
              </NavLink>
            )}
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