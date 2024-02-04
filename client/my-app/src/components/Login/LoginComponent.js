import React from 'react';
import { useDispatch } from 'react-redux';
import LoginHandler from './LoginForm'; // Import the LoginHandler

const LoginComponent = () => {
    const dispatch = useDispatch();


    return (
        <div className="main-content">
            <LoginHandler />
        </div>
    );
};

export default LoginComponent;
