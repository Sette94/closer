import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import "./Home.css"

const ConsolidatedHomeContainer = () => {
    const navigate = useNavigate()

    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const user = useSelector((state) => state.user);

    return (

        <div>
            {isAuthenticated ? (
                <h1>Welcome {user.username}</h1>
            ) : (
                <p>Please log in.</p>
            )}
            <div className="landingpage">

                <button className='homepagebuttons'
                    onClick={() => { navigate('/mygames') }}

                >Add New Game</button>
                <button className='homepagebuttons'
                    onClick={() => { navigate('/closer') }}

                >MLB Closer</button>
            </div>
        </div>

    );
};

export default ConsolidatedHomeContainer;
