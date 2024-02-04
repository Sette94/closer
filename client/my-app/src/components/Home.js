import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ConsolidatedHomeContainer = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    console.log(state)

    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const user = useSelector((state) => state.user);


    console.log(isAuthenticated)


    return (
        <div>
            <div className="landingpage">
                {isAuthenticated ? (
                    <h1>{user.username}</h1>
                ) : (
                    <p>Please log in.</p>
                )}
                <button >Add New Game</button>
                <button>MLB Closer</button>
            </div>
        </div>
    );
};

export default ConsolidatedHomeContainer;
