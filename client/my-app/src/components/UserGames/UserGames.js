import "./UserGames.css"

function UserGames({ game }) {

    const game_object = game.games.game_data.dates[0].games[0]
    console.log(game_object)

    const date = game.games.date

    const home_team_score = game_object.teams.home.score
    const home_team_id = game_object.teams.home.team.id
    const home_team_logo = `https://www.mlbstatic.com/team-logos/${home_team_id}.svg`

    const away_team_score = game_object.teams.away.score
    const away_team_id = game_object.teams.away.team.id
    const away_team_logo = `https://www.mlbstatic.com/team-logos/${away_team_id}.svg`

    const win = game_object.teams.home.isWinner == "true" ? "W" : "L"





    return (
        <div className="boxScoreContainer">
            <p>{date}&nbsp;</p>
            <div className="teamInfo">
                <img className="teamLogo" src={away_team_logo} alt={`Away Team Logo`} /><p>{away_team_score}</p>
            </div>
            <div className="teamInfo">
                <img className="teamLogo" src={home_team_logo} alt={`Home Team Logo`} />
                <p>{home_team_score}</p>

                <p>&nbsp;&nbsp;{win}</p>
            </div>
        </div>
    )
}

export default UserGames