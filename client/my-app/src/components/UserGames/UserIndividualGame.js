import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';  // Import useParams
import "./styles/IndividualGames.css"
import 'react-tooltip/dist/react-tooltip.css'
import Tooltip from '@mui/material/Tooltip';
import ReactRoundedImage from "react-rounded-image"
import moment from "moment-timezone";




import axios from 'axios';

function IndividualGame({ game }) {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const currentGame = game !== undefined ? game : location.state.games;


    // Changing this block of code to accept state through the navigate link 

    // const [game, setGame] = useState(null);
    //  const [isLoading, setIsLoading] = useState(false);

    // const searchParams = new URLSearchParams(useLocation().search);
    // const gamePk = searchParams.get('gamePk');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setIsLoading(true);

    //         try {
    //             const response = await axios.get(`http://localhost:5555/users/${user.user_id}/games?gamePk=${gamePk}`);
    //             setGame(response.data);
    //         } catch (error) {
    //             console.error('Error fetching user games:', error);
    //         } finally {
    //             setIsLoading(false);

    //         }
    //     };

    //     fetchData();
    // }, [gamePk]);

    // if (isLoading) {
    //     return <div style={{ color: 'black' }}>Loading...</div>;
    // }



    if (currentGame) {
        const game_object = currentGame.games.game_data.dates[0].games[0];
        const date = currentGame.games.date

        // Team Data
        const home_team_score = game_object.teams.home.score
        const home_team_id = game_object.teams.home.team.id
        const home_team_logo = `https://www.mlbstatic.com/team-logos/${home_team_id}.svg`
        const homePitcher = game_object.teams.home.probablePitcher;


        const away_team_score = game_object.teams.away.score
        const away_team_id = game_object.teams.away.team.id
        const away_team_logo = `https://www.mlbstatic.com/team-logos/${away_team_id}.svg`
        const awayPitcher = game_object.teams.away.probablePitcher;
        const win = game_object.teams.home.isWinner == "true" ? "W" : "L"

        const firstPitch = game_object.gameInfo.firstPitch
        const dayNight = game_object.dayNight == "night" ? <div >First Pitch: {UTCtimeconverter(firstPitch)} 🌇</div> : <div >First Pitch: {UTCtimeconverter(firstPitch)} ☀️</div>;



        function UTCtimeconverter(utcTimeStr) {
            return moment.utc(utcTimeStr).tz("America/New_York").format("h:mm A");

        }


        function weatherData() {
            return Object.entries(game_object.weather).map(([key, value], index) => (
                <div key={key}>
                    <i><b>{key[0].toUpperCase() + key.slice(1)}</b>: {value}</i>
                    {index < Object.entries(game_object.weather).length - 1 && <br />} {/* Add <br> if not the last entry */}
                </div>
            ))
        }


        function homerunData() {
            return game_object.homeRuns.map((homerun) => {
                const headshot = `https://img.mlbstatic.com/mlb/images/players/head_shot/${homerun.matchup.batter.id}.jpg`;
                const description = homerun.result.description;
                const name = homerun.matchup.batter.fullName;

                return (
                    <Tooltip title={name} placement="bottom">
                        <div className="homerunitems" key={homerun.matchup.batter.id}>
                            <a href={`https://www.mlb.com/player/${homerun.matchup.batter.id}`} target="_blank">
                                {/* <img className='homerunheadshot' src={headshot} alt={`headshot`} /> */}
                                <ReactRoundedImage
                                    image={headshot}
                                    roundedColor="#66A5CC"
                                    imageWidth="120"
                                    imageHeight="165"
                                    roundedSize="8"
                                    borderRadius="15"
                                    hoverColor="#DD1144"
                                />
                            </a>
                        </div>
                    </Tooltip>


                );
            });
        }


        function gameData() {
            const attendance = game_object.gameInfo.attendance
            const time = `${Math.floor(game_object.gameInfo.gameDurationMinutes / 60)}:${game_object.gameInfo.gameDurationMinutes % 60}`
            const series = game_object.gamesInSeries


            return (
                <div>
                    <i><b>Attendance</b>: {attendance}</i>
                    <br />
                    <i><b>Time of Game</b>: {time}</i>
                    <br />
                    <i><b>Game In Series</b>: {series}</i>

                </div>
            )

        }


        return (
            <div>
                <h2>{game_object.venue.name} {date} {dayNight}</h2>

                <div className="scoreContainer">
                    <div className='awayTeamLogo'>
                        <img src={away_team_logo} alt={`Away Team Logo`} />
                        <p>{away_team_score}</p>
                    </div>
                    <div className='homeTeamLogo'>
                        <img src={home_team_logo} alt={`Home Team Logo`} /> <p>{home_team_score}</p>

                    </div>
                </div>

                <div className="mainContainer">
                    <div className="gameStory">
                        <iframe src={`https://${game_object.story.link}`} />
                    </div>

                    <div className='individualInfo'>
                        <div className='nongameData'>
                            <div className='weather'>
                                <h3>Weather</h3>
                                {weatherData()}
                            </div>

                            <div className='gameInfo'>
                                <h3>Game Info</h3>
                                {gameData()}
                            </div>

                        </div>

                        <div className='gameData'>
                            <div>
                                <h3>Starting Pitchers</h3>
                                <div className="pitchersContainer">
                                    <div className='awayTeamPitcher'>
                                        {/* <h4>{game_object.teams.away.team.name}</h4> */}
                                        <Tooltip title={awayPitcher.fullName} placement="bottom">
                                            <a href={`https://www.mlb.com/player/${awayPitcher.id}`} target="_blank">
                                                <ReactRoundedImage
                                                    image={`https://img.mlbstatic.com/mlb/images/players/head_shot/${awayPitcher.id}.jpg`}
                                                    roundedColor="#FF0000"
                                                    imageWidth="120"
                                                    imageHeight="165"
                                                    roundedSize="8"
                                                    borderRadius="15"
                                                    hoverColor="#66A5CC"
                                                />

                                            </a>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        VS
                                    </div>
                                    <div className='homeTeamPitcher'>
                                        {/* <h4>{game_object.teams.home.team.name}</h4> */}
                                        <Tooltip title={homePitcher.fullName} placement="bottom">
                                            <a href={`https://www.mlb.com/player/${homePitcher.id}`} target="_blank">

                                                <ReactRoundedImage
                                                    image={`https://img.mlbstatic.com/mlb/images/players/head_shot/${homePitcher.id}.jpg`}
                                                    roundedColor="#FF0000"
                                                    imageWidth="120"
                                                    imageHeight="165"
                                                    roundedSize="8"
                                                    borderRadius="15"
                                                    hoverColor="#66A5CC"
                                                />
                                            </a>


                                        </Tooltip>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div>
                            <h3>Homerun Hitters</h3>
                            <div className='homeruns'>
                                {homerunData()}
                            </div>

                        </div>


                    </div>


                </div>

            </div>

        );
    }

    return <div>No game data available.</div>;
}

export default IndividualGame;
