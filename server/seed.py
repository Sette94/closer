from app import app
from models import db, Users, Games
import json


if __name__ == "__main__":
    with app.app_context():

        print("Clearing data...")
        Users.query.delete()
        Games.query.delete()

        print("Starting seed...")

        print("Creating User...")
        user_1 = Users(username="Sette94",
                       password="njs2394@gmail.com")

        user_2 = Users(username="Test90",
                       password="test@gmail.com")

        db.session.add_all([user_1, user_2])
        db.session.commit()

        print("Creating user games")

        game_1 = Games(
            gamePk=716840,
            user_ids=[1, 2],
            game_data={
                "copyright": "Copyright 2024 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt",
                "totalItems": 1,
                "totalEvents": 0,
                "totalGames": 1,
                "totalGamesInProgress": 0,
                "dates": [
                    {
                        "date": "2023-08-26",
                        "totalItems": 1,
                        "totalEvents": 0,
                        "totalGames": 1,
                        "totalGamesInProgress": 0,
                        "games": [
                                {
                                    "gamePk": 716840,
                                    "gameGuid": "d4121d54-6473-4ff2-b854-b22c9b966878",
                                    "link": "/api/v1.1/game/716840/feed/live",
                                    "gameType": "R",
                                    "season": "2023",
                                    "gameDate": "2023-08-26T23:10:00Z",
                                    "officialDate": "2023-08-26",
                                    "status": {
                                        "abstractGameState": "Final",
                                        "codedGameState": "F",
                                        "detailedState": "Final",
                                        "statusCode": "F",
                                        "startTimeTBD": "False",
                                        "abstractGameCode": "F"
                                    },
                                    "teams": {
                                        "away": {
                                            "leagueRecord": {
                                                "wins": 63,
                                                "losses": 67,
                                                "pct": ".485"
                                            },
                                            "score": 5,
                                            "team": {
                                                "id": 108,
                                                "name": "Los Angeles Angels",
                                                "link": "/api/v1/teams/108"
                                            },
                                            "isWinner": "True",
                                            "splitSquad": "False",
                                            "seriesNumber": 42
                                        },
                                        "home": {
                                            "leagueRecord": {
                                                "wins": 59,
                                                "losses": 71,
                                                "pct": ".454"
                                            },
                                            "score": 3,
                                            "team": {
                                                "id": 121,
                                                "name": "New York Mets",
                                                "link": "/api/v1/teams/121"
                                            },
                                            "isWinner": "False",
                                            "splitSquad": "False",
                                            "seriesNumber": 42
                                        }
                                    },
                                    "venue": {
                                        "id": 3289,
                                        "name": "Citi Field",
                                        "link": "/api/v1/venues/3289"
                                    },
                                    "content": {
                                        "link": "/api/v1/game/716840/content"
                                    },
                                    "isTie": "False",
                                    "weather": {
                                        "condition": "Clear",
                                        "temp": "82",
                                        "wind": "2 mph, Out To LF"
                                    },
                                    "gameInfo": {
                                        "attendance": 35890,
                                        "firstPitch": "2023-08-26T23:10:00.000Z",
                                        "gameDurationMinutes": 177,
                                        "delayDurationMinutes": 0
                                    },
                                    "gameNumber": 1,
                                    "publicFacing": "True",
                                    "story": {
                                        "gamePk": 716840,
                                        "link": "stories.mlb.com/live/716840.html",
                                        "pages": 15,
                                        "lastUpdated": "2023-08-27T05:58:06.623Z"
                                    },
                                    "doubleHeader": "N",
                                    "gamedayType": "P",
                                    "tiebreaker": "N",
                                    "calendarEventID": "14-716840-2023-08-26",
                                    "seasonDisplay": "2023",
                                    "dayNight": "night",
                                    "scheduledInnings": 9,
                                    "reverseHomeAwayStatus": "False",
                                    "inningBreakLength": 120,
                                    "gamesInSeries": 3,
                                    "seriesGameNumber": 2,
                                    "seriesDescription": "Regular Season",
                                    "homeRuns": [
                                        {
                                            "result": {
                                                "type": "atBat",
                                                "event": "Home Run",
                                                "description": "Mickey Moniak homers (13) on a fly ball to right center field.  ",
                                                "rbi": 1,
                                                "awayScore": 2,
                                                "homeScore": 0
                                            },
                                            "about": {
                                                "halfInning": "top",
                                                "inning": 2
                                            },
                                            "count": {
                                                "balls": 2,
                                                "strikes": 1,
                                                "outs": 0
                                            },
                                            "matchup": {
                                                "batter": {
                                                    "id": 666160,
                                                    "fullName": "Mickey Moniak",
                                                    "link": "/api/v1/people/666160",
                                                    "primaryPosition": {
                                                        "code": "8",
                                                        "name": "Outfielder",
                                                        "type": "Outfielder",
                                                        "abbreviation": "CF"
                                                    },
                                                    "stats": [
                                                        {
                                                            "type": {
                                                                "displayName": "gameLog"
                                                            },
                                                            "group": {
                                                                "displayName": "hitting"
                                                            },
                                                            "exemptions": [],
                                                            "stats": {
                                                                "summary": "1-4 | HR, K, RBI",
                                                                "gamesPlayed": 1,
                                                                "flyOuts": 0,
                                                                "groundOuts": 1,
                                                                "runs": 1,
                                                                "doubles": 0,
                                                                "triples": 0,
                                                                "homeRuns": 1,
                                                                "strikeOuts": 1,
                                                                "baseOnBalls": 0,
                                                                "intentionalWalks": 0,
                                                                "hits": 1,
                                                                "hitByPitch": 0,
                                                                "avg": ".277",
                                                                "atBats": 4,
                                                                "obp": ".308",
                                                                "slg": ".496",
                                                                "ops": ".804",
                                                                "caughtStealing": 0,
                                                                "stolenBases": 0,
                                                                "stolenBasePercentage": ".---",
                                                                "groundIntoDoublePlay": 0,
                                                                "groundIntoTriplePlay": 0,
                                                                "plateAppearances": 4,
                                                                "rbi": 1,
                                                                "leftOnBase": 0,
                                                                "sacBunts": 0,
                                                                "sacFlies": 0,
                                                                "catchersInterference": 0,
                                                                "pickoffs": 0,
                                                                "atBatsPerHomeRun": "4.00"
                                                            }
                                                        },
                                                        {
                                                            "type": {
                                                                "displayName": "gameLog"
                                                            },
                                                            "group": {
                                                                "displayName": "pitching"
                                                            },
                                                            "exemptions": [],
                                                            "stats": {}
                                                        },
                                                        {
                                                            "type": {
                                                                "displayName": "statsSingleSeason"
                                                            },
                                                            "group": {
                                                                "displayName": "hitting"
                                                            },
                                                            "exemptions": [],
                                                            "stats": {
                                                                "summary": ".277 AVG, 13 HR, 40 RBI",
                                                                "gamesPlayed": 75,
                                                                "flyOuts": 0,
                                                                "groundOuts": 34,
                                                                "runs": 32,
                                                                "doubles": 19,
                                                                "triples": 1,
                                                                "homeRuns": 13,
                                                                "strikeOuts": 102,
                                                                "baseOnBalls": 9,
                                                                "intentionalWalks": 1,
                                                                "hits": 76,
                                                                "hitByPitch": 3,
                                                                "avg": ".277",
                                                                "atBats": 274,
                                                                "obp": ".308",
                                                                "caughtStealing": 3,
                                                                "stolenBases": 6,
                                                                "stolenBasePercentage": ".667",
                                                                "groundIntoDoublePlay": 3,
                                                                "groundIntoTriplePlay": 0,
                                                                "plateAppearances": 286,
                                                                "rbi": 40,
                                                                "leftOnBase": 96,
                                                                "sacBunts": 0,
                                                                "sacFlies": 0,
                                                                "babip": ".396",
                                                                "catchersInterference": 0,
                                                                "pickoffs": 0,
                                                                "atBatsPerHomeRun": "21.08"
                                                            }
                                                        },
                                                        {
                                                            "type": {
                                                                "displayName": "statsSingleSeason"
                                                            },
                                                            "group": {
                                                                "displayName": "pitching"
                                                            },
                                                            "exemptions": [],
                                                            "stats": {
                                                                "summary": "0-0 | -.-- ERA",
                                                                "gamesPlayed": 0,
                                                                "gamesStarted": 0,
                                                                "groundOuts": 0,
                                                                "airOuts": 0,
                                                                "runs": 0,
                                                                "doubles": 0,
                                                                "triples": 0,
                                                                "homeRuns": 0,
                                                                "strikeOuts": 0,
                                                                "baseOnBalls": 0,
                                                                "intentionalWalks": 0,
                                                                "hits": 0,
                                                                "hitByPitch": 0,
                                                                "atBats": 0,
                                                                "caughtStealing": 0,
                                                                "stolenBases": 0,
                                                                "stolenBasePercentage": ".---",
                                                                "numberOfPitches": 0,
                                                                "wins": 0,
                                                                "losses": 0,
                                                                "saves": 0,
                                                                "saveOpportunities": 0,
                                                                "holds": 0,
                                                                "blownSaves": 0,
                                                                "earnedRuns": 0,
                                                                "battersFaced": 0,
                                                                "outs": 0,
                                                                "gamesPitched": 0,
                                                                "completeGames": 0,
                                                                "shutouts": 0,
                                                                "balls": 0,
                                                                "strikes": 0,
                                                                "strikePercentage": "-.--",
                                                                "hitBatsmen": 0,
                                                                "balks": 0,
                                                                "wildPitches": 0,
                                                                "pickoffs": 0,
                                                                "rbi": 0,
                                                                "gamesFinished": 0,
                                                                "inheritedRunners": 0,
                                                                "inheritedRunnersScored": 0,
                                                                "catchersInterference": 0,
                                                                "sacBunts": 0,
                                                                "sacFlies": 0,
                                                                "passedBall": 0
                                                            }
                                                        }
                                                    ]
                                                },
                                                "pitcher": {
                                                    "id": 471911,
                                                    "fullName": "Carlos Carrasco",
                                                    "link": "/api/v1/people/471911"
                                                },
                                                "batterHotColdZones": [],
                                                "pitcherHotColdZones": [],
                                                "splits": {}
                                            },
                                            "pitchIndex": [],
                                            "actionIndex": [],
                                            "runnerIndex": [],
                                            "runners": [],
                                            "playEvents": []
                                        },
                                        {
                                            "result": {
                                                "type": "atBat",
                                                "event": "Home Run",
                                                "description": "Daniel Vogelbach homers (12) on a fly ball to left center field.  ",
                                                "rbi": 1,
                                                "awayScore": 5,
                                                "homeScore": 3
                                            },
                                            "about": {
                                                "halfInning": "bottom",
                                                "inning": 6
                                            },
                                            "count": {
                                                "balls": 3,
                                                "strikes": 2,
                                                "outs": 1
                                            },
                                            "matchup": {
                                                "batter": {
                                                    "id": 596129,
                                                    "fullName": "Daniel Vogelbach",
                                                    "link": "/api/v1/people/596129",
                                                    "primaryPosition": {
                                                        "code": "10",
                                                        "name": "Designated Hitter",
                                                        "type": "Hitter",
                                                        "abbreviation": "DH"
                                                    },
                                                    "stats": [
                                                        {
                                                            "type": {
                                                                "displayName": "gameLog"
                                                            },
                                                            "group": {
                                                                "displayName": "hitting"
                                                            },
                                                            "exemptions": [],
                                                            "stats": {
                                                                "summary": "1-4 | HR, RBI, R",
                                                                "gamesPlayed": 1,
                                                                "flyOuts": 0,
                                                                "groundOuts": 0,
                                                                "runs": 1,
                                                                "doubles": 0,
                                                                "triples": 0,
                                                                "homeRuns": 1,
                                                                "strikeOuts": 0,
                                                                "baseOnBalls": 0,
                                                                "intentionalWalks": 0,
                                                                "hits": 1,
                                                                "hitByPitch": 0,
                                                                "avg": ".224",
                                                                "atBats": 4,
                                                                "obp": ".330",
                                                                "slg": ".398",
                                                                "ops": ".728",
                                                                "caughtStealing": 0,
                                                                "stolenBases": 0,
                                                                "stolenBasePercentage": ".---",
                                                                "groundIntoDoublePlay": 0,
                                                                "groundIntoTriplePlay": 0,
                                                                "plateAppearances": 4,
                                                                "rbi": 1,
                                                                "leftOnBase": 2,
                                                                "sacBunts": 0,
                                                                "sacFlies": 0,
                                                                "catchersInterference": 0,
                                                                "pickoffs": 0,
                                                                "atBatsPerHomeRun": "4.00"
                                                            }
                                                        },
                                                        {
                                                            "type": {
                                                                "displayName": "gameLog"
                                                            },
                                                            "group": {
                                                                "displayName": "pitching"
                                                            },
                                                            "exemptions": [],
                                                            "stats": {}
                                                        },
                                                        {
                                                            "type": {
                                                                "displayName": "statsSingleSeason"
                                                            },
                                                            "group": {
                                                                "displayName": "hitting"
                                                            },
                                                            "exemptions": [],
                                                            "stats": {
                                                                "summary": ".224 AVG, 12 HR, 42 RBI",
                                                                "gamesPlayed": 92,
                                                                "flyOuts": 0,
                                                                "groundOuts": 63,
                                                                "runs": 30,
                                                                "doubles": 7,
                                                                "triples": 0,
                                                                "homeRuns": 12,
                                                                "strikeOuts": 72,
                                                                "baseOnBalls": 38,
                                                                "intentionalWalks": 1,
                                                                "hits": 55,
                                                                "hitByPitch": 1,
                                                                "avg": ".224",
                                                                "atBats": 246,
                                                                "obp": ".330",
                                                                "caughtStealing": 0,
                                                                "stolenBases": 0,
                                                                "stolenBasePercentage": ".---",
                                                                "groundIntoDoublePlay": 6,
                                                                "groundIntoTriplePlay": 0,
                                                                "plateAppearances": 285,
                                                                "rbi": 42,
                                                                "leftOnBase": 105,
                                                                "sacBunts": 0,
                                                                "sacFlies": 0,
                                                                "babip": ".265",
                                                                "catchersInterference": 0,
                                                                "pickoffs": 0,
                                                                "atBatsPerHomeRun": "20.50"
                                                            }
                                                        },
                                                        {
                                                            "type": {
                                                                "displayName": "statsSingleSeason"
                                                            },
                                                            "group": {
                                                                "displayName": "pitching"
                                                            },
                                                            "exemptions": [],
                                                            "stats": {
                                                                "summary": "0-0 | -.-- ERA",
                                                                "gamesPlayed": 0,
                                                                "gamesStarted": 0,
                                                                "groundOuts": 0,
                                                                "airOuts": 0,
                                                                "runs": 0,
                                                                "doubles": 0,
                                                                "triples": 0,
                                                                "homeRuns": 0,
                                                                "strikeOuts": 0,
                                                                "baseOnBalls": 0,
                                                                "intentionalWalks": 0,
                                                                "hits": 0,
                                                                "hitByPitch": 0,
                                                                "atBats": 0,
                                                                "caughtStealing": 0,
                                                                "stolenBases": 0,
                                                                "stolenBasePercentage": ".---",
                                                                "numberOfPitches": 0,
                                                                "wins": 0,
                                                                "losses": 0,
                                                                "saves": 0,
                                                                "saveOpportunities": 0,
                                                                "holds": 0,
                                                                "blownSaves": 0,
                                                                "earnedRuns": 0,
                                                                "battersFaced": 0,
                                                                "outs": 0,
                                                                "gamesPitched": 0,
                                                                "completeGames": 0,
                                                                "shutouts": 0,
                                                                "balls": 0,
                                                                "strikes": 0,
                                                                "strikePercentage": "-.--",
                                                                "hitBatsmen": 0,
                                                                "balks": 0,
                                                                "wildPitches": 0,
                                                                "pickoffs": 0,
                                                                "rbi": 0,
                                                                "gamesFinished": 0,
                                                                "inheritedRunners": 0,
                                                                "inheritedRunnersScored": 0,
                                                                "catchersInterference": 0,
                                                                "sacBunts": 0,
                                                                "sacFlies": 0,
                                                                "passedBall": 0
                                                            }
                                                        }
                                                    ]
                                                },
                                                "pitcher": {
                                                    "id": 608678,
                                                    "fullName": "Dominic Leone",
                                                    "link": "/api/v1/people/608678"
                                                },
                                                "batterHotColdZones": [],
                                                "pitcherHotColdZones": [],
                                                "splits": {}
                                            },
                                            "pitchIndex": [],
                                            "actionIndex": [],
                                            "runnerIndex": [],
                                            "runners": [],
                                            "playEvents": []
                                        }
                                    ],
                                    "recordSource": "S",
                                    "ifNecessary": "N",
                                    "ifNecessaryDescription": "Normal Game",
                                    "lineups": {
                                        "homePlayers": [
                                            {
                                                "id": 607043,
                                                "fullName": "Brandon Nimmo",
                                                "link": "/api/v1/people/607043",
                                                "firstName": "Brandon",
                                                "lastName": "Nimmo",
                                                "primaryPosition": {
                                                    "code": "8",
                                                    "name": "Outfielder",
                                                    "type": "Outfielder",
                                                    "abbreviation": "CF"
                                                },
                                                "useName": "Brandon"
                                            },
                                            {
                                                "id": 596019,
                                                "fullName": "Francisco Lindor",
                                                "link": "/api/v1/people/596019",
                                                "firstName": "Francisco",
                                                "lastName": "Lindor",
                                                "primaryPosition": {
                                                    "code": "6",
                                                    "name": "Shortstop",
                                                    "type": "Infielder",
                                                    "abbreviation": "SS"
                                                },
                                                "useName": "Francisco"
                                            },
                                            {
                                                "id": 643446,
                                                "fullName": "Jeff McNeil",
                                                "link": "/api/v1/people/643446",
                                                "firstName": "Jeff",
                                                "lastName": "McNeil",
                                                "primaryPosition": {
                                                    "code": "4",
                                                    "name": "Second Base",
                                                    "type": "Infielder",
                                                    "abbreviation": "2B"
                                                },
                                                "useName": "Jeff"
                                            },
                                            {
                                                "id": 624413,
                                                "fullName": "Pete Alonso",
                                                "link": "/api/v1/people/624413",
                                                "firstName": "Peter",
                                                "lastName": "Alonso",
                                                "primaryPosition": {
                                                    "code": "3",
                                                    "name": "First Base",
                                                    "type": "Infielder",
                                                    "abbreviation": "1B"
                                                },
                                                "useName": "Pete"
                                            },
                                            {
                                                "id": 596129,
                                                "fullName": "Daniel Vogelbach",
                                                "link": "/api/v1/people/596129",
                                                "firstName": "Daniel",
                                                "lastName": "Vogelbach",
                                                "primaryPosition": {
                                                    "code": "10",
                                                    "name": "Designated Hitter",
                                                    "type": "Hitter",
                                                    "abbreviation": "DH"
                                                },
                                                "useName": "Daniel"
                                            },
                                            {
                                                "id": 621466,
                                                "fullName": "DJ Stewart",
                                                "link": "/api/v1/people/621466",
                                                "firstName": "Demetrius",
                                                "lastName": "Stewart",
                                                "primaryPosition": {
                                                    "code": "9",
                                                    "name": "Outfielder",
                                                    "type": "Outfielder",
                                                    "abbreviation": "RF"
                                                },
                                                "useName": "DJ"
                                            },
                                            {
                                                "id": 553882,
                                                "fullName": "Omar Narvaez",
                                                "link": "/api/v1/people/553882",
                                                "firstName": "Omar",
                                                "lastName": "Narvaez",
                                                "primaryPosition": {
                                                    "code": "2",
                                                    "name": "Catcher",
                                                    "type": "Catcher",
                                                    "abbreviation": "C"
                                                },
                                                "useName": "Omar"
                                            },
                                            {
                                                "id": 542364,
                                                "fullName": "Rafael Ortega",
                                                "link": "/api/v1/people/542364",
                                                "firstName": "Rafael",
                                                "lastName": "Ortega",
                                                "primaryPosition": {
                                                    "code": "7",
                                                    "name": "Outfielder",
                                                    "type": "Outfielder",
                                                    "abbreviation": "LF"
                                                },
                                                "useName": "Rafael"
                                            },
                                            {
                                                "id": 660620,
                                                "fullName": "Jonathan Arauz",
                                                "link": "/api/v1/people/660620",
                                                "firstName": "Jonathan",
                                                "lastName": "Arauz",
                                                "primaryPosition": {
                                                    "code": "5",
                                                    "name": "Third Base",
                                                    "type": "Infielder",
                                                    "abbreviation": "3B"
                                                },
                                                "useName": "Jonathan"
                                            }
                                        ],
                                        "awayPlayers": [
                                            {
                                                "id": 650859,
                                                "fullName": "Luis Rengifo",
                                                "link": "/api/v1/people/650859",
                                                "firstName": "Luis",
                                                "lastName": "Rengifo",
                                                "primaryPosition": {
                                                    "code": "6",
                                                    "name": "Shortstop",
                                                    "type": "Infielder",
                                                    "abbreviation": "SS"
                                                },
                                                "useName": "Luis"
                                            },
                                            {
                                                "id": 660271,
                                                "fullName": "Shohei Ohtani",
                                                "link": "/api/v1/people/660271",
                                                "firstName": "Shohei",
                                                "lastName": "Ohtani",
                                                "primaryPosition": {
                                                    "code": "10",
                                                    "name": "Designated Hitter",
                                                    "type": "Hitter",
                                                    "abbreviation": "DH"
                                                },
                                                "useName": "Shohei"
                                            },
                                            {
                                                "id": 592273,
                                                "fullName": "Brandon Drury",
                                                "link": "/api/v1/people/592273",
                                                "firstName": "Brandon",
                                                "lastName": "Drury",
                                                "primaryPosition": {
                                                    "code": "4",
                                                    "name": "Second Base",
                                                    "type": "Infielder",
                                                    "abbreviation": "2B"
                                                },
                                                "useName": "Brandon"
                                            },
                                            {
                                                "id": 519058,
                                                "fullName": "Mike Moustakas",
                                                "link": "/api/v1/people/519058",
                                                "firstName": "Michael",
                                                "lastName": "Moustakas",
                                                "primaryPosition": {
                                                    "code": "5",
                                                    "name": "Third Base",
                                                    "type": "Infielder",
                                                    "abbreviation": "3B"
                                                },
                                                "useName": "Mike"
                                            },
                                            {
                                                "id": 681351,
                                                "fullName": "Logan O'Hoppe",
                                                "link": "/api/v1/people/681351",
                                                "firstName": "Logan",
                                                "lastName": "O'Hoppe",
                                                "primaryPosition": {
                                                    "code": "2",
                                                    "name": "Catcher",
                                                    "type": "Catcher",
                                                    "abbreviation": "C"
                                                },
                                                "useName": "Logan"
                                            },
                                            {
                                                "id": 666160,
                                                "fullName": "Mickey Moniak",
                                                "link": "/api/v1/people/666160",
                                                "firstName": "McKenzie",
                                                "lastName": "Moniak",
                                                "primaryPosition": {
                                                    "code": "8",
                                                    "name": "Outfielder",
                                                    "type": "Outfielder",
                                                    "abbreviation": "CF"
                                                },
                                                "useName": "Mickey"
                                            },
                                            {
                                                "id": 592669,
                                                "fullName": "Hunter Renfroe",
                                                "link": "/api/v1/people/592669",
                                                "firstName": "Dustin",
                                                "lastName": "Renfroe",
                                                "primaryPosition": {
                                                    "code": "9",
                                                    "name": "Outfielder",
                                                    "type": "Outfielder",
                                                    "abbreviation": "RF"
                                                },
                                                "useName": "Hunter"
                                            },
                                            {
                                                "id": 663550,
                                                "fullName": "Trey Cabbage",
                                                "link": "/api/v1/people/663550",
                                                "firstName": "Trey",
                                                "lastName": "Cabbage",
                                                "primaryPosition": {
                                                    "code": "3",
                                                    "name": "First Base",
                                                    "type": "Infielder",
                                                    "abbreviation": "1B"
                                                },
                                                "useName": "Trey"
                                            },
                                            {
                                                "id": 545341,
                                                "fullName": "Randal Grichuk",
                                                "link": "/api/v1/people/545341",
                                                "firstName": "Randal",
                                                "lastName": "Grichuk",
                                                "primaryPosition": {
                                                    "code": "7",
                                                    "name": "Outfielder",
                                                    "type": "Outfielder",
                                                    "abbreviation": "LF"
                                                },
                                                "useName": "Randal"
                                            }
                                        ]
                                    }
                                }
                        ],
                        "events": []
                    }
                ]
            }

        )

        db.session.add_all([
            game_1])
        db.session.commit()

        print("Seeding complete...")
