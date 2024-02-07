import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './styles/CloserGame.css';
import { useSelector } from 'react-redux';

import IndividualGame from '../UserGames/UserIndividualGame';

function CloserGameComponent() {
    const location = useLocation();
    const user = useSelector((state) => state.user);

    const games = location.state.games;
    const [gameIndex, setGameIndex] = useState(0);
    const navigate = useNavigate();

    function focus(index) {
        setGameIndex(index);
    }

    if (games.length === 0 || gameIndex < 0) {
        navigate('/closer');
        setGameIndex(0);
    } else if (gameIndex >= games.length) {
        navigate(`/closer/${user.user_id}/general`);
        setGameIndex(0);
    }


    return (
        <div>
            <div onClick={() => focus(gameIndex - 1)} className="arrow" style={{ transform: 'rotate(90deg)', top: '15%', left: '5%' }}>
                <span ></span>
                <span ></span>
                <span ></span>
            </div>

            <div onClick={() => focus(gameIndex + 1)} className="arrow" style={{ transform: 'rotate(-90deg)', top: '15%', left: '95%' }}>
                <span ></span>
                <span ></span>
                <span ></span>
            </div>

            <div>
                <IndividualGame game={games[gameIndex]} />
            </div>
        </div>
    );

}


export default CloserGameComponent

