import React from 'react';
import { useDispatch } from 'react-redux';
import LoginHandler from './LoginForm'; // Import the LoginHandler
import "./styles/Login.css"
import Popup from 'react-popup';


const LoginComponent = () => {
    const dispatch = useDispatch();


    return (
        <div className='loginContainer'>
            <div className='loginComponent'>
            </div>
            <div className='loginForm'>
                <div className='baseball'>
                    <svg id="ball" width="23" height="23" viewBox="0 0 46.6 46.6" transform="rotate(130)">
                        <circle class="white" cx="23.3" cy="23.3" r="23.3" stroke="black" stroke-width="2" />
                        <path class="red" d="M22.4 16.4c-5.6 0-11.9-1.2-18.1-4.8 -1.2-0.7-1.6-2.2-0.9-3.4C4.1 7 5.7 6.6 6.9 7.3c15.6 9.2 32.8 0.1 32.9 0 1.2-0.7 2.7-0.2 3.4 1 0.7 1.2 0.2 2.7-1 3.4C41.7 11.9 33.3 16.4 22.4 16.4z" />
                        <path class="red" d="M5.6 39.1c-0.9 0-1.7-0.5-2.2-1.3 -0.7-1.2-0.2-2.7 1-3.4 0.8-0.4 19.7-10.6 37.9 0 1.2 0.7 1.6 2.2 0.9 3.4s-2.2 1.6-3.4 0.9C24 29.5 7 38.7 6.8 38.8 6.4 39 6 39.1 5.6 39.1z" />
                    </svg>
                </div>
                <h2 className='loginheader'> Closer </h2>
                <br></br>
                <img className='riveragif' src="/gifs/rivera.gif" alt="Image" />
                <Popup />
                <LoginHandler />
            </div>
        </div>
    );

};

export default LoginComponent;
