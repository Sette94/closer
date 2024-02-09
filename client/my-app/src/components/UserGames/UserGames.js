import "./styles/UserGamesComponent.css"
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaTrash } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";


function UserGames({ user_id, game, handleDelete }) {



    const navigate = useNavigate();

    const game_object = game.games.game_data.dates[0].games[0]
    const date = game.games.date
    const home_team_score = game_object.teams.home.score
    const home_team_id = game_object.teams.home.team.id
    const home_team_name = game_object.teams.home.team.name
    const home_team_logo = `https://www.mlbstatic.com/team-logos/${home_team_id}.svg`

    const away_team_score = game_object.teams.away.score
    const away_team_id = game_object.teams.away.team.id
    const away_team_name = game_object.teams.away.team.name

    const away_team_logo = `https://www.mlbstatic.com/team-logos/${away_team_id}.svg`
    const win = game_object.teams.home.isWinner == true ? "W" : "L"


    return (
        <div className="cards">
            <Card>
                <Card.Body>
                    <Card.Title>{date}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><img className="teamLogo" src={away_team_logo} alt={`Away Team Logo`} /> <img className="teamLogo" src={home_team_logo} alt={`Home Team Logo`} /></Card.Subtitle>
                    <Card.Text>
                        {game_object.venue.name}<br></br>
                        {game_object.weather.condition}&nbsp;
                        {game_object.weather.temp}°F
                    </Card.Text>
                </Card.Body>
                <div className="icon-container">
                    <MdOutlineOndemandVideo className="view-button" onClick={() => { navigate(`/games/${user_id}?gamePk=${game_object.gamePk}`, { state: { games: game } }) }} />
                    <FaTrash className="delete-button" onClick={() => handleDelete(game_object.gamePk, user_id)} />
                </div>

            </Card>

        </div>

    )
}

export default UserGames