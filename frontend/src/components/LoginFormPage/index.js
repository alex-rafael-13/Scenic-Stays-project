import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

export default function LoginFormPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    console.log(sessionUser)

    if(sessionUser){
       return(<Redirect to='/' />)
    }

    //Submission 
    const handleSubmit = e => {
        e.preventDefault()

        setErrors([])

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }

    return(
        <form onSubmit={handleSubmit}>
            <ul>
            {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
            </ul>
            <label>
                Username or Email:
                <input 
                    type='text'
                    onChange={e => setCredential(e.target.value)}
                    value={credential}
                    required
                />
            </label>
            <label>
                Password:
                <input 
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </label>
            <button>Login</button>
        </form>
    )
}