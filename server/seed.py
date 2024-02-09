import csv
from app import app
from models import db, Users, Games, UserGames, Ballparks
import json
import requests


if __name__ == "__main__":
    with app.app_context():

        print("Clearing data...")
        Users.query.delete()
        # Games.query.delete()
        # UserGames.query.delete()
        # Ballparks.query.delete()

        def seeding_games():
            failed_game_pks = []
            # Assuming 'games.csv' is the name of your CSV file
            with open('2023_schedule.csv', newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    game_pk = int(row['Game_pk'])
                    # Now you can use game_pk in your request URL
                    print(game_pk)
                    try:
                        r = requests.get(
                            f"https://statsapi.mlb.com/api/v1/schedule?gamePk={game_pk}&useLatestGames=true&hydrate=homeRuns,story,stats,gameInfo,lineups,weather,probablePitcher(all),scoringplays")
                        game_data_return = r.json()

                        # Assuming Games is your SQLAlchemy model
                        game = Games(
                            gamePk=game_data_return.get('dates')[0].get('games')[
                                0].get('gamePk'),
                            season=int(game_data_return.get('dates')[
                                0].get('games')[0].get('season')),
                            date=game_data_return.get('dates')[0].get('games')[
                                0].get('officialDate'),
                            venue_id=game_data_return.get('dates')[0].get('games')[
                                0].get('venue').get('id'),
                            game_data=game_data_return
                        )

                        db.session.add(game)
                        db.session.commit()

                    except Exception as e:
                        failed_game_pks.append(game_pk)
                        db.session.rollback()  # Roll back the transaction
                        print(
                            f"Failed to process game_pk {game_pk}. Error: {str(e)}")

            # Writing failed game_pks to a text file
            with open('failed_game_pks.txt', 'w') as f:
                for game_pk in failed_game_pks:
                    f.write(str(game_pk) + '\n')

            print("auto seeding")
            return

        print("Starting seed...")
        # seeding_games()

        print("Creating User...")
        user_1 = Users(username="Sette94",
                       password="Nick")

        user_2 = Users(username="Ian",
                       password="Ian")

        user_3 = Users(username="App",
                       password="App")

        user_4 = Users(username="Sanjay",
                       password="Sanjay")

        user_5 = Users(username="Joe Campbell",
                       password="Joe")

        user_6 = Users(username="Bailie",
                       password="Bailie")

        user_7 = Users(username="Grant",
                       password="Grant")

        db.session.add_all(
            [user_1, user_2, user_3, user_4, user_5, user_6, user_7])
        db.session.commit()

        print("Creating user games")

        print("Creating attended game")

        # attended_game_1 = UserGames(
        #     gamePk=716595,
        #     user_id=1
        # )

        # attended_game_2 = UserGames(
        #     gamePk=716840,
        #     user_id=1
        # )

        # attended_game_3 = UserGames(
        #     gamePk=716877,
        #     user_id=1
        # )

        # attended_game_4 = UserGames(
        #     gamePk=717142,
        #     user_id=1
        # )

        # attended_game_5 = UserGames(
        #     gamePk=717655,
        #     user_id=1
        # )

        # attended_game_6 = UserGames(
        #     gamePk=717934,
        #     user_id=1
        # )

        # attended_game_7 = UserGames(
        #     gamePk=718099,
        #     user_id=1
        # )

        # attended_game_8 = UserGames(
        #     gamePk=718219,
        #     user_id=1
        # )

        # attended_game_9 = UserGames(
        #     gamePk=718303,
        #     user_id=1
        # )

        # attended_game_10 = UserGames(
        #     gamePk=718496,
        #     user_id=1
        # )

        # attended_game_11 = UserGames(
        #     gamePk=718610,
        #     user_id=1
        # )

        # db.session.add_all([
        #     attended_game_1, attended_game_2, attended_game_3, attended_game_4, attended_game_5, attended_game_6, attended_game_7, attended_game_8,
        #     attended_game_9, attended_game_10, attended_game_11])
        # db.session.commit()

        print("Creating Venues")
        venue_1 = Ballparks(
            venue_id=1,
            venue_name="Angel Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.80019044,
                    "longitude": -117.8823996
                }
            }
        )

        venue_2 = Ballparks(
            venue_id=2,
            venue_name="Oriole Park at Camden Yards",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 39.283787,
                    "longitude": -76.621689
                }
            }
        )

        venue_3 = Ballparks(
            venue_id=3,
            venue_name="Fenway Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 42.346456,
                    "longitude": -71.097441
                }
            }
        )

        venue_4 = Ballparks(
            venue_id=4,
            venue_name="Guaranteed Rate Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 41.83,
                    "longitude": -87.634167
                }
            }
        )

        venue_5380 = Ballparks(
            venue_id=5380,
            venue_name="CoolToday Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 27.04422,
                    "longitude": -82.23593
                }
            }
        )

        venue_5 = Ballparks(
            venue_id=5,
            venue_name="Progressive Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 41.495861,
                    "longitude": -81.685255
                }
            }
        )

        venue_5381 = Ballparks(
            venue_id=5381,
            venue_name="London Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 51.50853,
                    "longitude": -0.12574
                }
            }
        )

        venue_7 = Ballparks(
            venue_id=7,
            venue_name="Kauffman Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 39.051567,
                    "longitude": -94.480483
                }
            }
        )

        venue_5000 = Ballparks(
            venue_id=5000,
            venue_name="The Ballpark of the Palm Beaches",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 26.75475,
                    "longitude": -80.11316
                }
            }
        )

        venue_10 = Ballparks(
            venue_id=10,
            venue_name="Oakland Coliseum",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 37.751511,
                    "longitude": -122.200698
                }
            }
        )

        venue_12 = Ballparks(
            venue_id=12,
            venue_name="Tropicana Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 27.767778,
                    "longitude": -82.6525
                }
            }
        )

        venue_2700 = Ballparks(
            venue_id=2700,
            venue_name="BayCare Ballpark",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 27.97136,
                    "longitude": -82.73199
                }
            }
        )

        venue_14 = Ballparks(
            venue_id=14,
            venue_name="Rogers Centre",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 43.64155,
                    "longitude": -79.38915
                }
            }
        )

        venue_15 = Ballparks(
            venue_id=15,
            venue_name="Chase Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.445302,
                    "longitude": -112.066687
                }
            }
        )

        venue_17 = Ballparks(
            venue_id=17,
            venue_name="Wrigley Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 41.948171,
                    "longitude": -87.655503
                }
            }
        )

        venue_19 = Ballparks(
            venue_id=19,
            venue_name="Coors Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 39.756042,
                    "longitude": -104.994136
                }
            }
        )

        venue_4629 = Ballparks(
            venue_id=4629,
            venue_name="Sloan Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.43081,
                    "longitude": -111.882
                }
            }
        )

        venue_22 = Ballparks(
            venue_id=22,
            venue_name="Dodger Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 34.07368,
                    "longitude": -118.24053
                }
            }
        )

        venue_4249 = Ballparks(
            venue_id=4249,
            venue_name="Salt River Fields at Talking Stick",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.54523,
                    "longitude": -111.88552
                }
            }
        )

        venue_31 = Ballparks(
            venue_id=31,
            venue_name="PNC Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 40.446904,
                    "longitude": -80.005753
                }
            }
        )

        venue_32 = Ballparks(
            venue_id=32,
            venue_name="American Family Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 43.02838,
                    "longitude": -87.97099
                }
            }
        )

        venue_2856 = Ballparks(
            venue_id=2856,
            venue_name="Clover Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 27.32478,
                    "longitude": -80.40471
                }
            }
        )

        venue_680 = Ballparks(
            venue_id=680,
            venue_name="T-Mobile Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 47.591333,
                    "longitude": -122.33251
                }
            }
        )

        venue_2602 = Ballparks(
            venue_id=2602,
            venue_name="Great American Ball Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 39.097389,
                    "longitude": -84.506611
                }
            }
        )

        venue_2603 = Ballparks(
            venue_id=2603,
            venue_name="Surprise Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.62762,
                    "longitude": -112.37849
                }
            }
        )

        venue_5421 = Ballparks(
            venue_id=5421,
            venue_name="Constellation Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 29.62275863,
                    "longitude": -95.64718141
                }
            }
        )

        venue_2862 = Ballparks(
            venue_id=2862,
            venue_name="Lee Health Sports Complex",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 26.53789,
                    "longitude": -81.84202
                }
            }
        )

        venue_2735 = Ballparks(
            venue_id=2735,
            venue_name="Journey Bank Ballpark",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 41.2419845,
                    "longitude": -77.0475104
                }
            }
        )

        venue_2500 = Ballparks(
            venue_id=2500,
            venue_name="Tempe Diablo Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.40092,
                    "longitude": -111.9707
                }
            }
        )

        venue_2504 = Ballparks(
            venue_id=2504,
            venue_name="The Stadium at the ESPN Wide World of Sports",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 28.33725,
                    "longitude": -81.55613
                }
            }
        )

        venue_2889 = Ballparks(
            venue_id=2889,
            venue_name="Busch Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 38.62256667,
                    "longitude": -90.19286667
                }
            }
        )

        venue_4169 = Ballparks(
            venue_id=4169,
            venue_name="loanDepot park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 25.77796236,
                    "longitude": -80.21951795
                }
            }
        )

        venue_2507 = Ballparks(
            venue_id=2507,
            venue_name="Hohokam Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.43831,
                    "longitude": -111.82973
                }
            }
        )

        venue_2508 = Ballparks(
            venue_id=2508,
            venue_name="Ed Smith Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 27.34795,
                    "longitude": -82.5174
                }
            }
        )

        venue_5325 = Ballparks(
            venue_id=5325,
            venue_name="Globe Life Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 32.747299,
                    "longitude": -97.081818
                }
            }
        )

        venue_2511 = Ballparks(
            venue_id=2511,
            venue_name="Publix Field at Joker Marchant Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 28.07437,
                    "longitude": -81.95113
                }
            }
        )

        venue_4309 = Ballparks(
            venue_id=4309,
            venue_name="JetBlue Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 26.55092,
                    "longitude": -81.76225
                }
            }
        )

        venue_2518 = Ballparks(
            venue_id=2518,
            venue_name="American Family Fields of Phoenix",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.49202,
                    "longitude": -112.1727
                }
            }
        )

        venue_2392 = Ballparks(
            venue_id=2392,
            venue_name="Minute Maid Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 29.756967,
                    "longitude": -95.355509
                }
            }
        )

        venue_2520 = Ballparks(
            venue_id=2520,
            venue_name="Roger Dean Chevrolet Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 26.89084,
                    "longitude": -80.11677
                }
            }
        )

        venue_3289 = Ballparks(
            venue_id=3289,
            venue_name="Citi Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 40.75753012,
                    "longitude": -73.84559155
                }
            }
        )

        venue_2394 = Ballparks(
            venue_id=2394,
            venue_name="Comerica Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 42.3391151,
                    "longitude": -83.048695
                }
            }
        )

        venue_2395 = Ballparks(
            venue_id=2395,
            venue_name="Oracle Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 37.778383,
                    "longitude": -122.389448
                }
            }
        )

        venue_2523 = Ballparks(
            venue_id=2523,
            venue_name="George M. Steinbrenner Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 27.97997,
                    "longitude": -82.50702
                }
            }
        )

        venue_5340 = Ballparks(
            venue_id=5340,
            venue_name="Estadio Alfredo Harp Helu",
            venue_location={}
        )

        venue_2526 = Ballparks(
            venue_id=2526,
            venue_name="LECOM Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 27.48535,
                    "longitude": -82.57076
                }
            }
        )

        venue_3809 = Ballparks(
            venue_id=3809,
            venue_name="Camelback Ranch",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.51434,
                    "longitude": -112.29612
                }
            }
        )

        venue_4705 = Ballparks(
            venue_id=4705,
            venue_name="Truist Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.890672,
                    "longitude": -84.467641
                }
            }
        )

        venue_2530 = Ballparks(
            venue_id=2530,
            venue_name="Peoria Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.63187,
                    "longitude": -112.23359
                }
            }
        )

        venue_2532 = Ballparks(
            venue_id=2532,
            venue_name="Scottsdale Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.48869,
                    "longitude": -111.92099
                }
            }
        )

        venue_2536 = Ballparks(
            venue_id=2536,
            venue_name="TD Ballpark",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 28.00401,
                    "longitude": -82.78695
                }
            }
        )

        venue_5355 = Ballparks(
            venue_id=5355,
            venue_name="Las Vegas Ballpark",
            venue_location={}
        )

        venue_3309 = Ballparks(
            venue_id=3309,
            venue_name="Nationals Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 38.872861,
                    "longitude": -77.007501
                }
            }
        )

        venue_3312 = Ballparks(
            venue_id=3312,
            venue_name="Target Field",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 44.981829,
                    "longitude": -93.277891
                }
            }
        )

        venue_3313 = Ballparks(
            venue_id=3313,
            venue_name="Yankee Stadium",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 40.82919482,
                    "longitude": -73.9264977
                }
            }
        )

        venue_2680 = Ballparks(
            venue_id=2680,
            venue_name="Petco Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 32.707861,
                    "longitude": -117.157278
                }
            }
        )

        venue_2681 = Ballparks(
            venue_id=2681,
            venue_name="Citizens Bank Park",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 39.90539086,
                    "longitude": -75.16716957
                }
            }
        )

        venue_3834 = Ballparks(
            venue_id=3834,
            venue_name="Goodyear Ballpark",
            venue_location={
                "defaultCoordinates": {
                    "latitude": 33.42892,
                    "longitude": -112.39027
                }
            }
        )

        # db.session.add_all([
        #     venue_1,
        #     venue_2,
        #     venue_3,
        #     venue_4,
        #     venue_5380,
        #     venue_5,
        #     venue_5381,
        #     venue_7,
        #     venue_5000,
        #     venue_10,
        #     venue_12,
        #     venue_2700,
        #     venue_14,
        #     venue_15,
        #     venue_17,
        #     venue_19,
        #     venue_4629,
        #     venue_22,
        #     venue_4249,
        #     venue_31,
        #     venue_32,
        #     venue_2856,
        #     venue_680,
        #     venue_2602,
        #     venue_2603,
        #     venue_5421,
        #     venue_2862,
        #     venue_2735,
        #     venue_2500,
        #     venue_2504,
        #     venue_2889,
        #     venue_4169,
        #     venue_2507,
        #     venue_2508,
        #     venue_5325,
        #     venue_2511,
        #     venue_4309,
        #     venue_2518,
        #     venue_2392,
        #     venue_2520,
        #     venue_3289,
        #     venue_2394,
        #     venue_2395,
        #     venue_2523,
        #     venue_5340,
        #     venue_2526,
        #     venue_3809,
        #     venue_4705,
        #     venue_2530,
        #     venue_2532,
        #     venue_2536,
        #     venue_5355,
        #     venue_3309,
        #     venue_3312,
        #     venue_3313,
        #     venue_2680,
        #     venue_2681,
        #     venue_3834
        # ]
        # )
        # db.session.commit()

        print("Seeding complete...")
