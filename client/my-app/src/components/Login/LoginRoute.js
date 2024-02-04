// PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const LoginRoute = ({ element, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);

    return (
        <Route
            {...rest}
            element={isAuthenticated ? element : <Navigate to="/home" />}
        />
    );
};

export default LoginRoute;
