import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [allowButton, setAllowButton] = useState(true)
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          
          if (data && data.errors) {
            const errArr = Object.values(data.errors)
            setErrors(errArr);
          }  
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  useEffect(() => {
    if(email.length > 0 && firstName.length > 0 && lastName.length > 0){
      if(username.length >= 4 && password.length >= 6){
        if(password === confirmPassword) setAllowButton(false)
          else setAllowButton(true)
      } else setAllowButton(true)
    } else setAllowButton(true)
  },[email,firstName, lastName,username, password, confirmPassword])

  return (
    <div className='signup-modal'>
      <h1>Sign Up</h1>
      <form className='signup-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className='input-labels'>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className='input-labels'>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className='input-labels'>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className='input-labels'>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className='input-labels'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className='input-labels'>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className={allowButton ? 'signup-disabled':'signup-button'} type="submit" disabled={allowButton}>Sign Up</button>
      </form>
    </ div>
  );
}

export default SignupFormModal;