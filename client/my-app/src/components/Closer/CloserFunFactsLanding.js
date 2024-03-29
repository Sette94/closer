import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/CloserLanding.css';

function CloserFunFactsLanding() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);



    return (
        <div className="closer-container">
            <h1>Closer: Fun Facts</h1>
            <br></br>
            <p className="greeting-open">The Short Porch, Shea Bridge, & Walls of Ivy</p>
            <br></br>
            <p className="greeting-seen">Peanuts, Popcorn, Ice Cream</p>
            <br></br>
            <p className="greeting-exact">All the things that make games great</p>
            <br></br>
            <p className="greeting-fact"> Here are some fun facts on how you spent <br></br>your time at the Ballpark</p>
            <br></br>
            <button id="btn-23" className="greeting-close" onClick={() => { navigate(`/closer/${user.user_id}/general/facts`) }}>Fun Facts</button>


        </div>
    );
}
export default CloserFunFactsLanding

