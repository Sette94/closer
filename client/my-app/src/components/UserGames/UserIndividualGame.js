import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';  // Import useParams
import styles from "./styles/IndividualGames.css"


import axios from 'axios';
import { object } from 'yup';

function IndividualGame() {
    const user = useSelector((state) => state.user);
    const [game, setGame] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = new URLSearchParams(useLocation().search);
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

        // Team Data
        const home_team_score = game_object.teams.home.score
        const home_team_id = game_object.teams.home.team.id
        const home_team_logo = `https://www.mlbstatic.com/team-logos/${home_team_id}.svg`

        const away_team_score = game_object.teams.away.score
        const away_team_id = game_object.teams.away.team.id
        const away_team_logo = `https://www.mlbstatic.com/team-logos/${away_team_id}.svg`
        const win = game_object.teams.home.isWinner == "true" ? "W" : "L"


        function weatherData() {
            return Object.entries(game_object.weather).map(([key, value], index) => (
                <span key={key}>
                    <i><b>{key[0].toUpperCase() + key.slice(1)}</b>: {value}</i>
                    {index < Object.entries(game_object.weather).length - 1 && <br />} {/* Add <br> if not the last entry */}
                </span>
            ))
        }


        function homerunData() {
            return game_object.homeRuns.map((homerun) => {
                const headshot = `https://img.mlbstatic.com/mlb/images/players/head_shot/${homerun.matchup.batter.id}.jpg`;
                const description = homerun.result.description;

                return (
                    <span key={homerun.matchup.batter.id} className="homerun-container">
                        <img className='homerunheadshot' src={headshot} alt={`headshot`} /> <p>{description}</p>
                    </span>

                );
            });
        }

        function gameData() {
            const dayNight = game_object.dayNight == "night" ? <span style={{ fontSize: '2em' }}>🌇</span> : <span style={{ fontSize: '2em' }}>☀️</span>;
            const attendance = game_object.gameInfo.attendance
            const time = `${Math.floor(game_object.gameInfo.gameDurationMinutes / 60)}:${game_object.gameInfo.gameDurationMinutes % 60}`



            return (
                <span>
                    <p>{dayNight}</p>
                    <i><b>Attendance</b>: {attendance}</i>
                    <br />
                    <i><b>Time</b>: {time}</i>

                </span>
            )

        }





        return (
            <div>
                <h2>{date}</h2>

                <div className="gameContainer">
                    <img src={away_team_logo} alt={`Away Team Logo`} /><p>{away_team_score}</p>
                    <img src={home_team_logo} alt={`Home Team Logo`} /> <p>{home_team_score}</p>


                </div>


                <div className="mainContainer">
                    <div className="gameStory">
                        <iframe src={`https://${game_object.story.link}`} />
                    </div>

                    <div className='individualGameInfo'>
                        <h3>Weather</h3>
                        {weatherData()}
                        <h3>Game Info</h3>
                        {gameData()}
                    </div>

                    <div>
                        <h3>Homeruns</h3>
                        {homerunData()}

                    </div>


                </div>

            </div>

        );
    }

    return <div>No game data available.</div>;
}

export default IndividualGame;
