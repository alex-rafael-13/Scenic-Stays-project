import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  // const userSpots = e => {
  //   e.preventDefault()
  //   history.push('/spots/current')
  // }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-button-cont">
      <button className='profile-button' onClick={openMenu}>
        <i className="fa-solid fa-bars" />
        <i className="fa-solid fa-tree" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="dropdown-menu">
            <li>Welcome {user.username}!</li>
            {/* <hr /> */}
            <li>{user.firstName} {user.lastName}</li>
            {/* <hr /> */}
            <li>{user.email}</li>
            <hr />
            <li>
              <NavLink to='/spots/current'>Manage Spots</NavLink>
            </li>
            <hr />
            <li>
              <button className='logout-button' onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className="dropdown-menu">
            <div className='modal-button'>
            <OpenModalMenuItem
              className='modal-button'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            </ div>
            <hr />
            <div className='modal-button'>
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </div>
          </ div>
        )}
      </ul>
    </div >
  );
}

export default ProfileButton;