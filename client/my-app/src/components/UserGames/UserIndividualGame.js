import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';  // Import useParams
import styles from "./styles/IndividualGames.css"


import axios from 'axios';

function IndividualGame() {
    const user = useSelector((state) => state.user);
    const [game, setGame] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const gamePk = searchParams.get('gamePk');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(`http://localhost:5555/users/${user.user_id}/games?gamePk=${gamePk}`);
                setGame(response.data);
            } catch (error) {
                console.error('Error fetching user games:', error);
            } finally {
                setIsLoading(false);

            }
        };

        fetchData();
    }, [gamePk]);

    if (isLoading) {
        return <div style={{ color: 'black' }}>Loading...</div>;
    }

    if (game) {
        const game_object = game.games.game_data.dates[0].games[0];

        const date = game.games.date
        const home_team_score = game_object.teams.home.score
        const home_team_id = game_object.teams.home.team.id
        const home_team_logo = `https://www.mlbstatic.com/team-logos/${home_team_id}.svg`

        const away_team_score = game_object.teams.away.score
        const away_team_id = game_object.teams.away.team.id
        const away_team_logo = `https://www.mlbstatic.com/team-logos/${away_team_id}.svg`
        const win = game_object.teams.home.isWinner == "true" ? "W" : "L"

        return (
            <div>
                <h2>{date}</h2>

                <div className="gameContainer">

                    <div >
                        <img src={away_team_logo} alt={`Away Team Logo`} /><p>{away_team_score}</p>
                    </div>
                    <div >
                        <img src={home_team_logo} alt={`Home Team Logo`} />
                        <p>{home_team_score}</p>

                        <p>&nbsp;&nbsp;{win}</p>
                    </div>
                </div>


                <div className="mainContainer">
                    <div className="gameStory">
                        <iframe src={`https://${game_object.story.link}`} />
                    </div>

                    <div className="gameinfo">
                        <div className='weather'></div>
                        <div className='homerun'></div>
                    </div>

                </div>

            </div>


        );
    }

    return <div>No game data available.</div>;
}

export default IndividualGame;
