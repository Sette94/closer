from flask import Flask
from flask_migrate import Migrate
from flask import Flask, make_response, request
from flask import Flask, redirect, url_for
from statistics import mean


from config import Helpers

from models import db, Users, Games, UserGames, Ballparks

# create a Flask application object
app = Flask(__name__)

# configure a database connection to the local file app.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# disable modification tracking to use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

# initialize the Flask application to use the database
db.init_app(app)


@app.route("/")
def index():
    return "<h1> Server </h1>"


@app.route("/users", methods=['GET', 'POST'])
@app.route("/users/<int:id>", methods=['GET', 'DELETE', 'PATCH'])
def users(id=None):
    if request.method == 'GET':
        if id is None:
            # Handle GET for all users
            all_users = Users.query.all()
            response_data = [user.to_dict(
                rules=('-attended_games',)) for user in all_users]
        else:
            # Handle GET for a specific user
            focus_user = Users.query.filter(Users.user_id == id).first()
            response_data = focus_user.to_dict(rules=('-attended_games',)) if focus_user else {
                'response': "User not found"}
    elif request.method == 'POST':
        # Handle POST for creating a new user
        try:
            form_data = request.get_json()

            new_user = Users(
                username=form_data.get('username'),
                password=form_data.get('password')
            )

            db.session.add(new_user)
            db.session.commit()

            response_data = {'response': "New User Created"}
        except:
            response_data = {'response': "Failed to create new user"}
    elif request.method == 'DELETE':
        # Handle DELETE for deleting a user
        try:
            focus_user = Users.query.filter(Users.user_id == id).first()
            associated_games = UserGames.query.filter(
                UserGames.user_id == id).all()

            for delete_asset in associated_games:
                db.session.delete(delete_asset)

            db.session.delete(focus_user)
            db.session.commit()

            response_data = {'response': "User Deleted"}
        except:
            response_data = {'response': "Failed to delete user"}
    elif request.method == 'PATCH':
        # Handle PATCH for updating user information
        try:
            focus_user = Users.query.filter(Users.user_id == id).first()
            form_data = request.get_json()

            for attr in form_data:
                setattr(focus_user, attr, form_data[attr])

            db.session.add(focus_user)
            db.session.commit()

            response_data = {'response': "User Information Updated"}
        except:
            response_data = {'response': "Failed to update user information"}

    else:
        response_data = {'response': "Invalid HTTP method"}

    return make_response(response_data)

# Individual Game Route


@app.route("/users/<int:id>/games", methods=['GET'])
def user_games_attended(id):
    focus_user = Users.query.filter(Users.user_id == id).first()

    if focus_user:
        season = request.args.get(
            'season', type=int, default=Helpers.current_year())
        game_number = request.args.get('game_number', type=int, default=None)

        user_games_list = Helpers.formatted_game_return(focus_user, season)

        if game_number:
            if game_number <= len(user_games_list):
                response_data = {"attended_games": user_games_list}[
                    'attended_games'][game_number-1]
                return response_data
            else:
                response_data = make_response(
                    {'error': 'Game number does not exist for user'}
                )
                return response_data

        response_data = make_response(
            user_games_list
        )

    else:
        response_data = make_response(
            {'response': "No user found"}
        )

    return response_data


# Aggregate Routes
@app.route("/users/<int:id>/homeruns", methods=['GET'])
def user_homeruns(id):
    focus_user = Users.query.filter(Users.user_id == id).first()

    if not focus_user:
        return make_response({'response': "User not found"})

    if request.method == 'GET':
        homerun_hitters = []
        season = request.args.get(
            'season', type=int, default=Helpers.current_year())

        for items in Helpers.formatted_game_return(focus_user, season):
            homeruns = items['games']['game_data']['dates'][0]['games'][0]['homeRuns']

            for players in homeruns:
                homerun_hitters.append({
                    "name": players['matchup']['batter']['fullName'],
                    "id": players['matchup']['batter']['id']
                })

            top_number = request.args.get('top')
            if top_number:
                response_data = {"home_hitters": Helpers.top_filter(
                    homerun_hitters, int(top_number))}
            else:
                response_data = {
                    "home_hitters": Helpers.count_occurrences(homerun_hitters)}

        return make_response(response_data)


@app.route("/users/<int:id>/players", methods=['GET'])
def user_players(id):
    focus_user = Users.query.filter(Users.user_id == id).first()

    if not focus_user:
        return make_response({'response': "User not found"})

    if request.method == 'GET':
        season = request.args.get(
            'season', type=int, default=Helpers.current_year())
        players_seen = []
        starting_pitchers = []

        for items in Helpers.formatted_game_return(focus_user, season):
            lineups = (items['games']['game_data']
                       ['dates'][0]['games'][0]['lineups'])
            team_info = items['games']['game_data']['dates'][0]['games'][0]['teams']

            for players in lineups['homePlayers'] + lineups['awayPlayers']:
                players_seen.append({
                    "name": players['fullName'],
                    "id": players['id']
                })

            for teams in team_info:
                starting_pitchers.append({
                    "name": team_info[teams]['probablePitcher']['fullName'],
                    "id": team_info[teams]['probablePitcher']['id']
                })

            top_number = request.args.get('top')
            if top_number:
                response_data = {"all_players": Helpers.top_filter(
                    players_seen, int(top_number)),
                    "starting_pitchers": Helpers.top_filter(starting_pitchers, int(top_number))}
            else:
                response_data = {
                    "all_players": Helpers.count_occurrences(players_seen),
                    "starting_pitchers": Helpers.count_occurrences(starting_pitchers)}

        return make_response(response_data)


@app.route("/users/<int:id>/userinfo", methods=['GET'])
def userinfo(id):
    focus_user = Users.query.filter(Users.user_id == id).first()

    if focus_user:
        season = request.args.get(
            'season', type=int, default=Helpers.current_year())
        if request.method == 'GET':
            minutes_list = []
            day_night_list = []
            weather_condition_list = []
            temperature_list = []
            venue_list = []
            home_win_list = []
            teams_seen = []
            dates_list = []

            for items in Helpers.formatted_game_return(focus_user, season):
                game_data = items['games']['game_data']['dates'][0]['games'][0]
                game_info = items['games']['game_data']['dates'][0]['games'][0]['gameInfo']
                home_team_info = items['games']['game_data']['dates'][0]['games'][0]['teams']['home']
                away_team_info = items['games']['game_data']['dates'][0]['games'][0]['teams']['away']

                minutes_list.append(game_info['gameDurationMinutes'])
                day_night_list.append(game_data['dayNight'])
                weather_condition_list.append(
                    game_data['weather']['condition'])
                temperature_list.append(int(game_data['weather']['temp']))
                venue_list.append(game_data['venue']['name'])
                home_win_list.append(home_team_info['isWinner'])
                teams_seen.append(home_team_info['team']['name'])
                teams_seen.append(away_team_info['team']['name'])
                dates_list.append(Helpers.month(game_data['gameDate']))

            day_night_object = Helpers.count_info(day_night_list)

            response_data = {
                "minutes_at_games": sum(minutes_list),
                "hours_at_games": round(sum(minutes_list) / 60, 0),
                "day_games": day_night_object.get('day'),
                "night_games": day_night_object.get('night'),
                "weather_condition": Helpers.count_info(weather_condition_list),
                "avgerage_temp": round(mean(temperature_list), 0),
                "ballparks": Helpers.count_info(venue_list),
                "record_wins": Helpers.count_info(home_win_list),
                "teams_seen": Helpers.count_info(teams_seen),
                "months": Helpers.count_info(dates_list)
            }
    else:
        response_data = {'response': "User not found"}

    return make_response(response_data)


if __name__ == '__main__':
    app.run(port=5555, debug=True)
