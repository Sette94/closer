import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./styles/CloserPlayers.css"
import FlipNumbers from 'react-flip-numbers';




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
                const response = await axios.get(`http://localhost:5555/users/${user.user_id}/players`);
                setuserPlayers(response.data);
                setCountedHitters(response.data.all_players.length)
            } catch (error) {
                console.error('Error fetching user Players:', error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();

    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/users/${user.user_id}/homeruns`);
                setuserHomeruns(response.data);
            } catch (error) {
                console.error('Error fetching user homeruns:', error);
            } finally {
                setIsLoading(false)
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
            </div>

            <div className="closerplayerinfo">
                <div className="closerhittersseen">
                    <div>
                        {
                            // userHomeruns.home_hitters.map((test) => {
                            //     console.log(test)
                            // })
                        }
                    </div>
                    <p>Hitters</p>
                </div>
                <div className="closerpitchersseen">
                    <p>Pitchers</p>
                </div>
                <div className="closerhomerunsseen">
                    <p>Homeruns</p>

                </div>


            </div>




        </div >
    );



}

export default CloserPlayersLanding