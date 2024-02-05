import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserInfo from './UserInfo';



function UserGameContainer() {
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const user = useSelector((state) => state.user);

    const [gameInfo, setGameInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/users/${user.user_id}/userinfo`);
                setGameInfo(response.data);
            } catch (error) {
                console.error('Error fetching user games:', error);
            }
        };

        fetchData();
    }, []);

    console.log(gameInfo)

    return (
        <div>
            <div className="landingpage">
                {isAuthenticated ? (
                    <h1>{user.username} Profile</h1>
                ) : (
                    <p>Please log in.</p>
                )}
            </div>
            {<UserInfo info={gameInfo} />}
            <div>


            </div>

        </div>

    )



}


export default UserGameContainer