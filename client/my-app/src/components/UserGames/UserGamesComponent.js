import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserGames from './UserGames';
import AddNewGameForm from './AddNewGameForm'
import "./styles/UserGamesComponent.css"
import Popup from 'react-popup';




function UserGameContainer() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const user = useSelector((state) => state.user);
    const [userGames, setuserGames] = useState([]);
    const [userBallparks, setuserBallparks] = useState([]);

    const [open, setOpen] = React.useState(false);


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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5555/ballparks/`);
                setuserBallparks(response.data);
            } catch (error) {
                console.error('Error fetching user games:', error);
            }
        };

        fetchData();
    }, []);

    function handleDelete(gamePk, user_id) {
        try {
            axios.delete(`http://localhost:5555/usergames/${user_id}`, {
                data: {
                    "gamePk": gamePk
                }
            }).then((res) => {

                console.log(res)
                Popup.alert("Successfully deleted game")
                setTimeout(() => {
                    Popup.close();
                }, 1500);
            });
        }
        catch (error) {
            console.error("Response error:", error.response.data);
            console.error("Status code:", error.response.status);

        }
        setuserGames(userGames.filter(game =>
            game.games.game_data.dates[0].games[0].gamePk !== gamePk))

    }

    function handleNewGame(gamePk, user_id) {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/users/${user_id}/games?gamePk=${gamePk}`);
                setuserGames((prevUserGames) => [
                    ...prevUserGames,
                    response.data // Assuming the data property contains the new game
                ]);
            } catch (error) {
                console.error('Error fetching user games:', error);
            }
        };
        fetchData();
    }




    const handleOpen = () => {
        setOpen(!open);
    };


    return (

        <div class="crudgamescontainer">
            <div className="addgame">
                <button id='btn-23' className={open ? 'smooth-open' : ''} onClick={handleOpen}>Add New Game</button>
                <br />
                <br />
                <div className={open ? 'form-container open' : 'form-container'}>
                    <AddNewGameForm handleNewGame={handleNewGame} ballparks={userBallparks} />
                </div>
            </div>

            <div className="seengameslist">
                {userGames && userGames.length > 0 && (
                    userGames
                        .sort((a, b) => new Date(b.games.date) - new Date(a.games.date))
                        .map((game) => (
                            <UserGames user_id={user.user_id} game={game} handleDelete={handleDelete} />
                        ))
                )}
            </div>



        </div>

    )



}


export default UserGameContainer