import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/CloserLanding.css';


function CloserEnding() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);


    return (
        <div className="closer-container">
            <div onClick={() => navigate(`/closer/${user.user_id}/general/players`)} className="arrow" style={{ transform: 'rotate(90deg)', top: '15%', left: '5%' }}>
                <span ></span>
                <span ></span>
                <span ></span>
            </div>
            <h1>Closer: The 9th Inning</h1>
            <br></br>
            <p className="greeting-open">That closes out your year!</p>
            <br></br>
            <p className="greeting-seen">The game begins again in the spring</p>
            <br></br>
            <p className="greeting-exact">When everything else begins again</p>
            <br></br>
            <div className='greeting-fact' id='closergoodbye'></div>
        </div>
    )
}

export default CloserEnding

