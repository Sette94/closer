from flask import Flask
from flask_migrate import Migrate
from flask import Flask, make_response, request


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


@app.route("/users/<int:id>/games", methods=['GET'])
def user_games(id):
    user_info = Users.query.filter(Users.user_id == id).first()

    if user_info:
        if request.method == 'GET':

            response_data = user_info.to_dict(
                only=('attended_games.games.game_data.dates.games.homeRuns.matchup',
                      '-attended_games.games.game_data.dates.games.homeRuns.matchup.batter.stats'))

    else:
        response_data = {'response': "User not found"}

    return make_response(response_data)


if __name__ == '__main__':
    app.run(port=5555, debug=True)
