import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./styles/CloserGeneral.css"


function CloserGameComponentGeneral() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const [userInfo, setuserInfo] = useState({});


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

                    <div className='scoreContainer'></div>
                    <h3 className='headers'> Wins and Losses </h3>
                    <div className='winandloss'> <div>



                    </div>
                    </div>

                    <div className='teamseenContainer'>
                        <h3 className='headers'> Teams Seen</h3>
                        <div className='teamsseen'>
                            {
                                userInfo.teams_seen?.map((team) => {
                                    const logoSrc = `https://www.mlbstatic.com/team-logos/${team.id}.svg`;
                                    return (
                                        <a href={logoSrc} key={team.id}>
                                            <img src={logoSrc} alt={team.name} />
                                        </a>
                                    )
                                })

                            }

                        </div>
                    </div>

                </div>


            </div>

        )
    }
    return <div>No game data available.</div>;




}

export default CloserGameComponentGeneral