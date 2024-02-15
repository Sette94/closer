import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './styles/CloserLanding.css';

function CloserComponent() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const [userGames, setuserGames] = useState([]);
    const [countedGames, setCountedGames] = useState(0);
    const [delayPassed, setDelayPassed] = useState(false);
    const [randomGames, setRandomGames] = useState([])



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/users/${user.user_id}/games`);
                setuserGames(response.data);
            } catch (error) {
                console.error('Error fetching user games:', error);
            }
        };

        fetchData();

    }, []);


    useEffect(() => {
        if (!delayPassed) {
            // If the delay has not passed yet, set a timeout to update the state after 4 seconds
            const timeout = setTimeout(() => {
                setDelayPassed(true);
            }, 7500);

            // Return a cleanup function to clear the timeout in case the component unmounts before the delay
            return () => clearTimeout(timeout);
        }
    }, [delayPassed]);


    useEffect(() => {
        let timer;
        if (delayPassed && countedGames < userGames.length) {

            const shuffledList = userGames.sort(() => Math.random() - 0.5);
            const randomSubset = shuffledList.slice(0, (shuffledList.length / 2));
            setRandomGames(randomSubset);


            timer = setInterval(() => {
                setCountedGames(prevCount => Math.min(prevCount + 1, userGames.length));
            }, 100);
        }
        return () => clearInterval(timer);
    }, [countedGames, delayPassed, userGames.length]);

    let message;

    switch (countedGames >= 0) {
        case countedGames < 10:
            message = <p className="greeting-close">Lets look at some of those games that you maybe forgot about</p>;
            break;
        case countedGames >= 10:
            message = <p className="greeting-close">Wow! double digits! <br></br>Lets check in on some of those games that you maybe forgot about</p>;
            break;
        default:
            message = null;
    }

    return (
        <div className="closer-container">
            <h1>Welcome To MLB Closer</h1>
            <br></br>
            <p className="greeting-open">You had a great year at the Ballpark!</p>
            <br></br>
            <p className="greeting-seen">You saw some great games!</p>
            <br></br>
            <p className="greeting-exact">I wonder how many?</p>
            <br></br>
            {countedGames == 0 ? "" : <span className="counter">{countedGames}</span>}
            <br></br>
            {message}
            <br></br>
            <button id="btn-23" className="greeting-close" onClick={() => { navigate(`/closer/${user.user_id}`, { state: { games: randomGames } }) }}>Games</button>


        </div>
    );
}

export default CloserComponent;
