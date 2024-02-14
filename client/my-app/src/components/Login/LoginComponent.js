import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginHandler from './LoginForm';
import RegistrationHandler from './RegistrationForm';
import Popup from 'react-popup';
import "./styles/Login.css";

const LoginComponent = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className='loginContainer'>
            <div className='loginComponent'>
            </div>
            <div className='loginForm'>
                <div className='baseball'>
                    <svg id="ball" width="23" height="23" viewBox="0 0 46.6 46.6" transform="rotate(130)">
                        <circle className="white" cx="23.3" cy="23.3" r="23.3" stroke="black" strokeWidth="2" />
                        <path className="red" d="M22.4 16.4c-5.6 0-11.9-1.2-18.1-4.8 -1.2-0.7-1.6-2.2-0.9-3.4C4.1 7 5.7 6.6 6.9 7.3c15.6 9.2 32.8 0.1 32.9 0 1.2-0.7 2.7-0.2 3.4 1 0.7 1.2 0.2 2.7-1 3.4C41.7 11.9 33.3 16.4 22.4 16.4z" />
                        <path className="red" d="M5.6 39.1c-0.9 0-1.7-0.5-2.2-1.3 -0.7-1.2-0.2-2.7 1-3.4 0.8-0.4 19.7-10.6 37.9 0 1.2 0.7 1.6 2.2 0.9 3.4s-2.2 1.6-3.4 0.9C24 29.5 7 38.7 6.8 38.8 6.4 39 6 39.1 5.6 39.1z" />
                    </svg>
                </div>
                <h2 className='loginheader'> Closer </h2>
                <br />
                <img className='riveragif' src="/gifs/closer.gif" alt="Image" />
                <Popup />
                <LoginHandler />
                <br />
                <button id='createaccount' className={open ? 'smooth-open' : ''} onClick={handleOpen}> Create Account </button>
                <div className={open ? 'register-open' : 'register-container'}>
                    <RegistrationHandler />
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default LoginComponent;
