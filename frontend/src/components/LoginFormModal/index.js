import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [button, setButton] = useState(true)
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const demoSignIn = () => {
    return dispatch(sessionActions.login({ credential:'Ironman', password:'password'}))
      .then(closeModal)
      .then(
        alert('Signed in as our Ironman!')
      )
  }

  useEffect(() => { 
    if(credential.length >= 4 && password.length >= 6) setButton(false)
    else setButton(true)
  }, [credential, password] )


  return (
    <div className='login-modal'>
      <h1>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label  className='input-label'>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='input-label'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className={button ? 'login-disabled': 'login-buttons'}
          type="submit" 
          disabled={button}>
            Log In
          </button>
      </form>
      <> --- OR --- </>
      <button onClick={demoSignIn} className='login-buttons'>Login as Demo User</button>
    </ div>
  );
}

export default LoginFormModal;