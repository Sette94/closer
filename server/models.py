from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.dialects.postgresql import JSON


metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

# Add models here


class Users(db.Model, SerializerMixin):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    first_year = db.Column(db.DateTime, server_default=db.func.now())

    games = db.relationship('Games', back_populates='users')

    def __repr__(self):
        return f'<User Info {self.user_id}, {self.username}, {self.password}, {self.first_year}>'


class Games(db.Model, SerializerMixin):
    __tablename__ = "user_games"

    gamePk = db.Column(db.Integer, primary_key=True)
    user_ids = db.Column(JSON, nullable=False)
    game_data = db.Column(JSON, nullable=True)

    users = db.relationship('Users', back_populates='games')

    __table_args__ = (
        db.ForeignKeyConstraint(['user_ids'], ['users.user_id']),
    )

    def __repr__(self):
        return f'<Game Info {self.gamePk}, {self.user_ids}, {self.game_data}>'
