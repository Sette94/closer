import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserGames from './UserGames';



function UserGameContainer() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const user = useSelector((state) => state.user);
    const [userGames, setuserGames] = useState([]);

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

    function handleDelete(gamePk, user_id) {
        axios.delete(`http://localhost:5555/usergames/${user_id}`, {
            data: {
                "gamePk": gamePk
            }
        });
        setuserGames(userGames.filter(game =>
            game.games.game_data.dates[0].games[0].gamePk !== gamePk))

    }


    return (
        <div>
            <div className="landingpage">
                {isAuthenticated ? (
                    <h1>{user.username} Profile</h1>
                ) : (
                    <p>Please log in.</p>
                )}
            </div>
            {userGames.map((game) => {
                return <UserGames user_id={user.user_id} game={game} handleDelete={handleDelete} />;
            })}
        </div>

    )



}


export default UserGameContainer