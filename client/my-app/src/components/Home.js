import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ConsolidatedHomeContainer = () => {
    const navigate = useNavigate()

    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const user = useSelector((state) => state.user);

    return (
        <div className="landingpage">
            {isAuthenticated ? (
                <h1>Welcome {user.username}</h1>
            ) : (
                <p>Please log in.</p>
            )}
            <button
                onClick={() => { navigate('/mygames') }}

            >Add New Game</button>
            <button>MLB Closer</button>
        </div>
    );
};

export default ConsolidatedHomeContainer;
