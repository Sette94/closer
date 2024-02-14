from server.models import db, Users, Games, UserGames, Ballparks
from server.config import Helpers
from flask import Flask
from flask_migrate import Migrate
from flask import Flask, jsonify, request
from flask import Flask, redirect, url_for
from statistics import mean
from flask_cors import CORS
from flask import jsonify
import os
import sys
sys.path.append(os.path.abspath(
    os.path.join(os.path.dirname(__file__), 'server')))


# create a Flask application object
app = Flask(__name__)
CORS(app)


# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

# initialize the Flask application to use the database
db.init_app(app)


@app.route("/")
def index():
    return "<h1> Server </h1>"


@app.route("/ballparks/", methods=['GET'])
def ballparks():
    if request.method == "GET":
        try:
            ballparks = Ballparks.query.all()
            response_data = [
                ballpark.venue_name for ballpark in Ballparks.query.all()]

            return jsonify(response_data), 200

        except Exception as e:
            response_data = {'response': "Failed to get parks"}
            return jsonify(response_data), 404


@app.route("/usergames/<int:id>", methods=['POST', 'DELETE'])
def user_games(id):

    if request.method == "POST":
        try:
            # Will take in date and venue name
            form_data = request.get_json()
            ballpark = Ballparks.query.filter(
                Ballparks.venue_name == form_data.get('data').get('venue')).first()

            ballpark_id = ballpark.venue_id

            game = Games.query.filter(Games.date == form_data.get('data').get(
                'date'), Games.venue_id == ballpark_id).all()

            new_attended = UserGames(
                gamePk=game[0].gamePk,
                user_id=id
            )

            db.session.add(new_attended)
            db.session.commit()

            response_data = {
                'response': f"New game at {ballpark.venue_name} on {form_data.get('data').get('date')} created!",
                'gamePk': game[0].gamePk}
            return jsonify(response_data), 200
        except Exception as e:
            response_data = {'response': "Failed to create game for user",
                             'gamePk': "No GamePk for this game"}
            return jsonify(response_data), 404
    elif request.method == "DELETE":

        try:
            form_data = request.get_json()

            game_to_delete = UserGames.query.filter(UserGames.user_id == id, UserGames.gamePk == form_data.get(
                'gamePk')).first()

            db.session.delete(game_to_delete)
            db.session.commit()
            response_data = {'response': "Game for user deleted"}
            return jsonify(response_data), 200

        except Exception as e:
            response_data = {'response': "Failed to delete game for user"}
            return jsonify(response_data), 404


@app.route("/games", methods=['GET'])
def games():
    if request.method == 'GET':
        gamepks = UserGames.query.with_entities(UserGames.gamePk).all()
        gamepks_list = [gamepk[0] for gamepk in gamepks]

        return jsonify({'gamepks': gamepks_list}), 200

    else:
        response_data = {'error': "No games availiable"}
        return jsonify(response_data), 404


@app.route("/users", methods=['GET', 'POST'])
@app.route("/users/<int:id>", methods=['GET', 'DELETE', 'PATCH'])
def users(id=None):
    if request.method == 'GET':
        if id is None:
            # Handle GET for all users
            all_users = Users.query.all()
            response_data = [user.to_dict(
                rules=('-attended_games',)) for user in all_users]
            return jsonify(response_data), 200

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
            return jsonify(response_data), 200

        except:
            response_data = {'response': "Failed to create new user"}
            return jsonify(response_data), 404

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
            return jsonify(response_data), 200

        except:
            response_data = {'response': "Failed to delete user"}
            return jsonify(response_data), 404

    elif request.method == 'PATCH':
        # Handle PATCH for updating user information
        try:
            form_data = request.get_json()

            focus_user = Users.query.filter(Users.user_id == id).first()
            usernames = [user.username for user in Users.query.all(
            ) if user.username == form_data.get('username') and user.user_id != form_data.get('user_id')]

            if len(usernames) >= 1:
                response_data = {'response': "Username already exists"}
                return jsonify(response_data), 400

            for attr in form_data:
                setattr(focus_user, attr, form_data[attr])

            db.session.add(focus_user)
            db.session.commit()

            response_data = {'response': "User Information Updated"}
            return jsonify(response_data), 200

        except:
            response_data = {'response': "Failed to update user information"}
            return jsonify(response_data), 404

    else:
        response_data = {'response': "Invalid HTTP method"}
        return jsonify(response_data), 404

    return jsonify(response_data), 200

# Individual Game Route


@app.route("/users/<int:id>/games", methods=['GET'])
def user_games_attended_info(id):
    season = request.args.get(
        'season', type=int, default=Helpers.current_year())
    gamePk = request.args.get('gamePk', type=int, default=None)

    user_games_list = [Helpers.formatted_game_return_refactor(ug)
                       for ug in UserGames.query.filter(UserGames.user_id == id).all() if ug.games.season == season]

    if request.method == 'GET':
        if gamePk:
            try:
                one_game = Helpers.formatted_game_return_refactor(UserGames.query.filter(
                    UserGames.user_id == id, UserGames.gamePk == gamePk).first())

                response_data = {"attended_games": one_game}[
                    'attended_games']

                return jsonify(response_data), 200

            except:
                response_data = jsonify(
                    {'error': 'Game does not exist for user'}
                )
                return jsonify(response_data), 404

        else:
            response_data = jsonify(
                user_games_list
            )

    else:
        response_data = jsonify(
            {'response': "No user found"}
        )
        return jsonify(response_data), 404

    return response_data


# Aggregate Routes
@app.route("/users/<int:id>/homeruns", methods=['GET'])
def user_homeruns(id):
    season = request.args.get(
        'season', type=int, default=Helpers.current_year())

    if request.method == 'GET':
        homerun_hitters = []
        try:
            for items in [Helpers.formatted_game_return_refactor(ug)
                          for ug in UserGames.query.filter(UserGames.user_id == id).all() if ug.games.season == season]:
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

            return jsonify(response_data), 200

        except:
            return jsonify({'response': "No homerun information for user"}), 404


@app.route("/users/<int:id>/players", methods=['GET'])
def user_players(id):
    season = request.args.get(
        'season', type=int, default=Helpers.current_year())

    if request.method == 'GET':
        players_seen = []
        starting_pitchers = []
        try:
            for items in [Helpers.formatted_game_return_refactor(ug)
                          for ug in UserGames.query.filter(UserGames.user_id == id).all() if ug.games.season == season]:
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
                        "starting_pitchers": Helpers.top_filter(starting_pitchers, int(top_number)),
                        "total_players": len(Helpers.count_occurrences(players_seen) + Helpers.count_occurrences(starting_pitchers))}
                else:
                    response_data = {
                        "all_players": Helpers.count_occurrences(players_seen),
                        "starting_pitchers": Helpers.count_occurrences(starting_pitchers)}

            return jsonify(response_data), 200

        except:
            return jsonify({'response': "No player information for user"}), 404

# Compiling user information and return stats based on user and season


@app.route("/users/<int:id>/userinfo", methods=['GET'])
def userinfo(id):
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

        try:
            for items in [Helpers.formatted_game_return_refactor(ug)
                          for ug in UserGames.query.filter(UserGames.user_id == id).all()
                          if ug.games.season == season]:
                game_data = items['games']['game_data']['dates'][0]['games'][0]
                game_info = items['games']['game_data']['dates'][0]['games'][0]['gameInfo']
                home_team_info = items['games']['game_data']['dates'][0]['games'][0]['teams']['home']
                away_team_info = items['games']['game_data']['dates'][0]['games'][0]['teams']['away']

                minutes_list.append(game_info['gameDurationMinutes'])
                day_night_list.append(game_data['dayNight'])
                weather_condition_list.append(
                    game_data['weather']['condition'])
                temperature_list.append(int(game_data['weather']['temp']))
                venue_list.append(
                    {"name": game_data['venue']['name'],
                     "id": game_data['venue']['id']})

                home_win_list.append(
                    'win' if home_team_info['isWinner'] == True else 'loss')
                # teams_seen.append(home_team_info['team']['name'])
                # teams_seen.append(away_team_info['team']['name'])

                teams_seen.append({
                    "name": home_team_info['team']['name'],
                    "id": home_team_info['team']['id']
                })

                teams_seen.append({
                    "name": away_team_info['team']['name'],
                    "id": away_team_info['team']['id']
                })

                dates_list.append(Helpers.month(game_data['gameDate']))

            day_night_object = Helpers.count_info(day_night_list)

            response_data = {
                "minutes_at_games": sum(minutes_list),
                "hours_at_games": round(sum(minutes_list) / 60, 0),
                "day_games": day_night_object.get('day'),
                "night_games": day_night_object.get('night'),
                "weather_condition": Helpers.count_info(weather_condition_list),
                "avgerage_temp": round(mean(temperature_list), 0),
                "ballparks": Helpers.count_occurrences(venue_list),
                "record_wins": Helpers.count_info(home_win_list),
                "teams_seen": Helpers.count_occurrences(teams_seen),
                "months": Helpers.month_info(dates_list)
            }
            return jsonify(response_data), 200

        except:
            return jsonify({'response': "No user information for user"}), 404


if __name__ == '__main__':
    app.run(port=5555, debug=True)
