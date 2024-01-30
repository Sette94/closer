from flask import Flask
from flask_migrate import Migrate
from flask import Flask, make_response


from models import db, Users, Games

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
        response = make_response(

            [user.to_dict() for user in all_users]
        )
    else:
        response = make_response(
            "no users",
            404
        )

    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)
