import React from 'react';
import { useDispatch } from 'react-redux';
import LoginHandler from './LoginForm'; // Import the LoginHandler
import "./styles/Login.css"

const LoginComponent = () => {
    const dispatch = useDispatch();


    return (
        <div className='loginContainer'>
            <div className='loginComponent'>
            </div>
            <div className='loginForm'>
                <LoginHandler />
            </div>
        </div>
    );

};

export default LoginComponent;
