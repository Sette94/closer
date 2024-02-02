# mlb-wrapped: Closer

## Introduction
An app to summarize your time at the ballpark. View your favorite players, biggest moments, and memories made. 

## User Stories
- As a user want to be able to see all games that I have inteded 
- As a user I want insights such as top plays, moments, and facts from each game I attended 
- As a user I want insights on each ballpark that I attended a game in for that season

## Wireframe
![Alt text](games.png) 
![Alt text](image.png)
## Kanban Board
https://trello.com/b/iA31bF8b/mlb-wrapped-closer

## DrawIo
![Alt text](drawio.png)

## API Routes used in React
| Method | Route                             | Description                                                                 |
|--------|-----------------------------------|-----------------------------------------------------------------------------|
| GET    | /users                            | Retrieve user information for accessing profiles and game data              |
| POST   | /users                            | Create a new user                                                           |
| GET    | /users/id                         | Retrieve user information for accessing profiles and game data for a user   |
| DELETE | /users/id                         | Delete a user                                                               |
| PATCH  | /users/id                         | Update user information                                                     |
| GET    | /users/id/games                   | Retrieve all game information for a given user                              |
| GET    | /users/id/games?season            | Retrieve all game information for a given user in a specific season         |
| GET    | /user/id/games?season&game_number | Retrieve information for a single game played by the user in a given season |
| GET    | /user/id/homeruns                 | Retrieve all players who have hit home runs in the user's games             |
| GET    | /user/id/homeruns?season          | Retrieve all home runs in a given season for the user                       |
| GET    | /user/id/players                  | Retrieve all players that the user has encountered                          |
| GET    | /user/id/players?season           | Retrieve all players that the user has encountered in a specific season     |
| GET    | /users/id/userinfo                | Retrieve game information for a given user                                  |
| GET    | /users/id/userinfo?season         | Retrieve game information for a given user in a specific season             |


## Schema
![Alt text](image.png)

## New Technology
React iframes to render MLB assets in app 

```
function App() {
  return (
    <div className="App">
      <h3>Iframes in React</h3>
      <iframe src="https://www.mlb.com/player/ronald-acuna-jr-660670"></iframe>
    </div>
  );
}
export default App;
```