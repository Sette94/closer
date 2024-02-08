import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./styles/CloserGeneral.css"
import FlipNumbers from 'react-flip-numbers';
import { PieChart } from 'react-minimal-pie-chart';


function CloserGameComponentGeneral() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const [userInfo, setuserInfo] = useState(null);
    const [minuteState, setMinuteState] = useState(false)
    const [hourState, setHourState] = useState(false)
    const [isTopVisible, setIsTopVisible] = useState(false);
    const [isAllVisible, setIsAllVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selected, setSelected] = useState(0);
    const [hovered, setHovered] = useState(undefined);



    const toggleVisibilityTop = () => {
        setIsTopVisible((prevState) => !prevState);
    };


    const toggleVisibilityAll = () => {
        setIsAllVisible((prevState) => !prevState);
    };




    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`http://localhost:5555/users/${user.user_id}/userinfo`);
                setuserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user games:', error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();

    }, []);

    if (isLoading) {
        return <div style={{ color: 'black' }}>Loading...</div>;
    }

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
                                        numbers={userInfo.record_wins?.win?.toString()}
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
                                        numbers={userInfo.record_wins?.loss?.toString()}
                                        play
                                        duration={3}
                                    />
                                </div>

                            </div>
                        </div>
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
                                        numbers={userInfo.hours_at_games?.toString()}
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
                                        numbers={userInfo.minutes_at_games?.toString()}
                                        play={minuteState}
                                        duration={5}
                                    />
                                </div>

                            </div>


                        </div>
                        <br></br>


                    </div>

                    <div className='tempandconditon'>
                        <h3 className='headers'>Day & Night</h3>

                        <div className='dayNightContainer'>
                            <div className='daynight'>
                                <div className='dayNightItem'>
                                    <div className='daynigthemoji'>☀️</div>
                                    <FlipNumbers
                                        height={40}
                                        width={30}
                                        color="white"
                                        background="#ffa700"
                                        numberStyle={{ fontSize: '24px' }}
                                        numbers={userInfo.day_games?.toString()}
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
                                        numbers={userInfo.night_games?.toString()}
                                        play
                                        duration={3}
                                    />
                                </div>
                            </div>
                            <div className='piechart'>
                                <PieChart
                                    style={{
                                        fontFamily:
                                            '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                                        fontSize: '8px',
                                    }}
                                    data={[
                                        { value: userInfo.day_games, color: '#ffa700' },
                                        { value: userInfo.night_games, color: '#36454F' },
                                    ]}
                                    radius={35}
                                    segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                                    segmentsShift={(index) => (index === selected ? 6 : 1)}
                                    animate
                                    label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}

                                    labelPosition={60}
                                    labelStyle={{
                                        fill: '#fff',
                                        opacity: 0.75,
                                        pointerEvents: 'none',
                                    }}
                                />
                            </div>
                        </div>
                    </div>


                    {userInfo && userInfo.teams_seen && (
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
                    )}
                </div>


            </div >

        )
    }
    return <div>No game data available</div>;




}

export default CloserGameComponentGeneral