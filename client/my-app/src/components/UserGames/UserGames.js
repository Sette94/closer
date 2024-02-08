import "./styles/UserGames.css"
import { useNavigate } from 'react-router-dom';


function UserGames({ user_id, game, handleDelete }) {



    const navigate = useNavigate();

    const game_object = game.games.game_data.dates[0].games[0]
    const date = game.games.date
    const home_team_score = game_object.teams.home.score
    const home_team_id = game_object.teams.home.team.id
    const home_team_logo = `https://www.mlbstatic.com/team-logos/${home_team_id}.svg`

    const away_team_score = game_object.teams.away.score
    const away_team_id = game_object.teams.away.team.id
    const away_team_logo = `https://www.mlbstatic.com/team-logos/${away_team_id}.svg`
    const win = game_object.teams.home.isWinner == true ? "W" : "L"



    return (
        <div>

            <div className="boxScoreContainer">


                {/* <button onClick={() => { navigate(`/games/${user_id}?gamePk=${game_object.gamePk}`) }}>{date}&nbsp;</button> */}

                <button onClick={() => { navigate(`/games/${user_id}?gamePk=${game_object.gamePk}`, { state: { games: game } }) }}>{date}&nbsp;</button>



                <div className="teamInfo">
                    <img className="teamLogo" src={away_team_logo} alt={`Away Team Logo`} /><p>{away_team_score}</p>
                </div>
                <div className="teamInfo">
                    <img className="teamLogo" src={home_team_logo} alt={`Home Team Logo`} />
                    <p>{home_team_score}</p>

                    <p>&nbsp;&nbsp;{win}</p>
                </div>
                <button onClick={() => handleDelete(game_object.gamePk, user_id)}>Delete</button>

            </div>
        </div>
    )
}

export default UserGames