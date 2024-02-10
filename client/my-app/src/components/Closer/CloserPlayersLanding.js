import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./styles/CloserPlayers.css"
import FlipNumbers from 'react-flip-numbers';
import Tooltip from '@mui/material/Tooltip';
import ReactRoundedImage from "react-rounded-image"



function CloserPlayersLanding() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    const [userPlayers, setuserPlayers] = useState({
        "all_players": [],
        "starting_pitchers": []
    });

    const [userHomeruns, setuserHomeruns] = useState([]);
    const [countedHitters, setCountedHitters] = useState(0);
    const [delayPassed, setDelayPassed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [playersResponse, homerunsResponse] = await Promise.all([
                    axios.get(`http://localhost:5555/users/${user.user_id}/players?top=5`),
                    axios.get(`http://localhost:5555/users/${user.user_id}/homeruns?top=5`)
                ]);
                setuserPlayers(playersResponse.data);
                setuserHomeruns(homerunsResponse.data);
                setCountedHitters(playersResponse.data.all_players.length)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);



    useEffect(() => {
        if (!delayPassed) {
            const timeout = setTimeout(() => {
                setDelayPassed(true);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [delayPassed]);


    function topData(list) {

        let data
        switch (list) {
            case 'players':
                data = userPlayers.all_players
                break;
            case 'pitchers':
                data = userPlayers.starting_pitchers
                break;
            case 'homeruns':
                data = userHomeruns.home_hitters
                break;

        }



        return data?.map((hitter) => {
            const headshot = `https://img.mlbstatic.com/mlb/images/players/head_shot/${hitter.id}.jpg`;
            const time_seen = hitter.times_seen;
            const name = hitter.name;

            return (
                <Tooltip title={
                    <div style={{ textAlign: "center" }}>
                        {name}
                        < br />
                        👀: {time_seen}
                    </div >}
                    placement="bottom" >
                    <div className="playerimages" key={hitter.id}>
                        <a href={`https://www.mlb.com/player/${hitter.id}`} target="_blank">
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
                </Tooltip >


            );
        });
    }




    if (isLoading) {
        return <div style={{ color: 'black' }}>Loading...</div>;
    }

    return (
        <div className="closer-container">
            <div onClick={() => navigate(`/closer/${user.user_id}/general/facts`)} className="arrow" style={{ transform: 'rotate(90deg)', top: '15%', left: '5%' }}>
                <span ></span>
                <span ></span>
                <span ></span>
            </div>

            <div onClick={() => navigate(`/closer/${user.user_id}/general/players`)} className="arrow" style={{ transform: 'rotate(-90deg)', top: '15%', left: '95%' }}>
                <span ></span>
                <span ></span>
                <span ></span>
            </div>

            <div className='closerinfocontainer'>

                <div className="closerinfo">
                    <h1>Closer: Players</h1>
                    <br></br>
                    <p >At the Ballpark you saw some of baseball's best players!</p>
                    <br></br>
                    <FlipNumbers className="playersseen"
                        height={70}
                        width={90}
                        color="white"
                        background="#136d15"
                        numberStyle={{ fontSize: '36px' }}
                        numbers={countedHitters.toString()}
                        play
                        duration={4}
                        delay={4}
                    />
                </div>
                <br></br>
                <p className="players-exact"> To be exact </p>
                <br></br>



                <div className='closerData' >

                    <div className='closerDataContainer'>
                        <p>All Players</p>
                        <div className="playerimagecontainer">
                            {topData('players')}
                        </div>
                    </div>
                    <div className='closerDataContainer'>

                        <p>Starting Pitchers</p>
                        <div className="playerimagecontainer">
                            {topData('pitchers')}
                        </div>
                    </div>

                    <div className='closerDataContainer'>
                        <p>Homeruns</p>
                        <div className="playerimagecontainer">
                            {topData('homeruns')}
                        </div>
                    </div>



                </div>
            </div>


        </div >
    );



}

export default CloserPlayersLanding