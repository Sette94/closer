import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./styles/CloserGeneral.css"
import FlipNumbers from 'react-flip-numbers';


function CloserGameComponentGeneral() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const [userInfo, setuserInfo] = useState(null);
    const [minuteState, setMinuteState] = useState(false)
    const [hourState, setHourState] = useState(false)
    const [isTopVisible, setIsTopVisible] = useState(false);
    const [isAllVisible, setIsAllVisible] = useState(false);


    const toggleVisibilityTop = () => {
        setIsTopVisible((prevState) => !prevState);
    };


    const toggleVisibilityAll = () => {
        setIsAllVisible((prevState) => !prevState);
    };




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/users/${user.user_id}/userinfo`);
                setuserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user games:', error);
            }
        };

        fetchData();

    }, []);



    if (userInfo) {
        return (
            <div>
                <div className='mainContainer'>

                    <div className='recordContainer'>
                        <h3 className='headers'> Wins Losses</h3>

                        <div className='winandloss'>
                            <div className="flipNumbersContainer">
                                <div className="flipNumber">
                                    <FlipNumbers
                                        height={40}
                                        width={30}
                                        color="white"
                                        background="#136d15"
                                        numberStyle={{ fontSize: '24px' }}
                                        numbers={userInfo.record_wins.win.toString()}
                                        play
                                        duration={3}
                                    />
                                </div>
                                <div className="flipNumber">
                                    <FlipNumbers
                                        height={40}
                                        width={30}
                                        color="white"
                                        background="#907830"
                                        numberStyle={{ fontSize: '24px' }}
                                        numbers={userInfo.record_wins.loss.toString()}
                                        play
                                        duration={3}
                                    />
                                </div>

                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <h3 className='headers'> Time At The Ballpark</h3>
                        <br></br>

                        <div className='winandloss'>

                            <h4 className='headers' >Hours</h4>
                            <div className="flipNumbersContainer">
                                <div onClick={() => { setHourState(!hourState) }} className="flipNumber">
                                    <FlipNumbers
                                        height={40}
                                        width={30}
                                        color="#333"
                                        background="#ecbf36"
                                        numberStyle={{ fontSize: '24px' }}
                                        numbers={userInfo.hours_at_games.toString()}
                                        play={hourState}
                                        duration={5}
                                    />
                                </div>

                            </div>
                            <br></br>

                            <h4 className='headers'>Minutes</h4>
                            <div className="flipNumbersContainer">
                                <div onClick={() => { setMinuteState(!minuteState) }} className="flipNumber">
                                    <FlipNumbers
                                        height={40}
                                        width={30}
                                        color="#333"
                                        background="#e3e3e3"
                                        numberStyle={{ fontSize: '24px' }}
                                        numbers={userInfo.minutes_at_games.toString()}
                                        play={minuteState}
                                        duration={5}
                                    />
                                </div>

                            </div>

                        </div>


                        <br></br>

                        <div className='dayNightContainer'>
                            <h3 className='headers'>Day & Night</h3>
                            <div className='daynight'>
                                <div className='dayNightItem'>
                                    <div className='daynigthemoji'>☀️</div>
                                    <FlipNumbers
                                        height={40}
                                        width={30}
                                        color="white"
                                        background="#ffa700"
                                        numberStyle={{ fontSize: '24px' }}
                                        numbers={userInfo.day_games.toString()}
                                        play
                                        duration={3}
                                    />
                                </div>
                                <div className='dayNightItem'>
                                    <div className='daynigthemoji'>🌇</div>
                                    <FlipNumbers
                                        height={40}
                                        width={30}
                                        color="white"
                                        background="#36454F"
                                        numberStyle={{ fontSize: '24px' }}
                                        numbers={userInfo.night_games.toString()}
                                        play
                                        duration={3}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className='teamseenContainer'>
                        <h3 className='headers'> Top 3 Teams Seen</h3>
                        {isTopVisible ? null : (
                            <button onClick={toggleVisibilityTop} className='revealtopbutton'>
                                Click to Reveal
                            </button>
                        )}

                        {isTopVisible && (
                            <div className='teamsseen'>
                                {userInfo.teams_seen.slice(0, 3)?.map((team) => {
                                    const logoSrc = `https://www.mlbstatic.com/team-logos/${team.id}.svg`;
                                    return (
                                        <a className="top-seen" href={logoSrc} key={team.id}>
                                            <img src={logoSrc} alt={team.name} />
                                        </a>
                                    );
                                })}
                            </div>
                        )}

                        <h3 className='headers'> All Teams Seen</h3>
                        {isAllVisible ? null : (
                            <button onClick={toggleVisibilityAll} className='revealallbutton'>
                                Click to Reveal
                            </button>

                        )}
                        {isAllVisible && (
                            <div className='teamsseen'>
                                {userInfo.teams_seen?.map((team) => {
                                    const logoSrc = `https://www.mlbstatic.com/team-logos/${team.id}.svg`;
                                    return (
                                        <a className="top-seen" href={logoSrc} key={team.id}>
                                            <img src={logoSrc} alt={team.name} />
                                        </a>
                                    );
                                })}
                            </div>
                        )}

                    </div>

                </div>


            </div >

        )
    }
    return <div>Loading...</div>;




}

export default CloserGameComponentGeneral