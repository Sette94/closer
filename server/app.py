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
def users():
    all_users = Users.query.all()
    if all_users:
        if request.method == 'GET':
            response = make_response(

                [user.to_dict(rules=('-attended_games',))
                 for user in all_users]
            )
        elif request.method == 'POST':
            try:
                form_data = request.get_json()

                new_user = Users(
                    username=form_data.get('username'),
                    password=form_data.get('password')
                )

                db.session.add(new_user)
                db.session.commit()

                response = make_response(
                    {'response': "New User Created"},
                    201
                )

            except:
                response = make_response(
                    {'response': "Failed to create new user"},
                    404
                )
    else:
        response = make_response(
            {'response': "No users to be found"},
            404
        )

    return response


@app.route("/users/<int:id>", methods=['GET', 'DELETE', 'PATCH'])
def user(id):
    focus_user = Users.query.filter(Users.user_id == id).first()
    if focus_user:
        if request.method == 'GET':
            response = make_response(
                focus_user.to_dict()
            )
        elif request.method == 'DELETE':
            try:
                associated_games = UserGames.query.filter(
                    UserGames.user_id == id).all()

                for delete_asset in associated_games:
                    db.session.delete(delete_asset)

                db.session.delete(focus_user)
                db.session.commit()

                response = make_response(
                    {'response': "User Delete"},
                    201
                )

            except:
                response = make_response(
                    {'response': "Failed to delete user"},
                    404
                )

        elif request.method == 'PATCH':
            try:
                form_data = request.get_json()

                for attr in form_data:
                    setattr(focus_user, attr, form_data[attr])

                db.session.add(focus_user)
                db.session.commit()

                response = make_response(
                    {'response': "User Information Updated"},
                    201
                )

            except:
                response = make_response(
                    {'response': "Failed to patch user"},
                    404
                )
    else:
        response = make_response(
            {'response': "No users to be found"},
            404
        )

    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)
