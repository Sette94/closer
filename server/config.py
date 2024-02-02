from collections import Counter
from datetime import datetime, date


class Helpers():
    def count_info(names_list):
        name_counts = {}

        for name in names_list:
            name_counts[name] = name_counts.get(name, 0) + 1

        return name_counts

    def count_occurrences(players_list):
        names_list = [player['name'] for player in players_list]

        player_counts = Counter(names_list)

        result = []
        for player_name, occurrences in player_counts.items():
            player = next(
                item for item in players_list if item['name'] == player_name)
            result.append(
                {'name': player_name, 'id': player['id'], 'times_seen': occurrences})

        return sorted(result, key=lambda x: x['times_seen'], reverse=True)

    def top_filter(players_list, number):
        names_list = [player['name'] for player in players_list]

        player_counts = Counter(names_list)

        top_5_players = player_counts.most_common(number)

        result = []
        for player_name, occurrences in top_5_players:
            player = next(
                item for item in players_list if item['name'] == player_name)
            result.append(
                {'name': player_name, 'id': player['id'], 'times_seen': occurrences})

        return sorted(result, key=lambda x: x['times_seen'], reverse=True)

    def current_year():
        today = date.today()
        year = today.year

        if today.month == 2 and today.day < 23:
            year -= 1

        return year

    def month(timestamp_str):
        timestamp = datetime.fromisoformat(
            timestamp_str[:-1])  # Remove 'Z' at the end
        month_name = timestamp.strftime("%B")

        return month_name

    def formatted_game_return_refactor(games):

        return games.to_dict(only=(
            'games.date',
            'games.game_data.dates.games.dayNight',
            'games.game_data.dates.games.gameDate',
            'games.game_data.dates.games.gameInfo',
            'games.game_data.dates.games.gameType',
            'games.game_data.dates.games.gamePk',
            'games.game_data.dates.games.gamesInSeries',
            'games.game_data.dates.games.homeRuns',
            '-games.game_data.dates.games.homeRuns.matchup.batter.stats',
            'games.game_data.dates.games.lineups',
            'games.game_data.dates.games.scoringPlays',
            'games.game_data.dates.games.story',
            'games.game_data.dates.games.teams',
            'games.game_data.dates.games.venue',
            'games.game_data.dates.games.weather',
        ))

    # def formatted_game_return(focus_user, season):
    #     return sorted(
    #         (ug.to_dict(only=(
    #             'games.date',
    #             'games.game_data.dates.games.dayNight',
    #             'games.game_data.dates.games.gameDate',
    #             'games.game_data.dates.games.gameInfo',
    #             'games.game_data.dates.games.gameType',
    #             'games.game_data.dates.games.gamePk',
    #             'games.game_data.dates.games.gamesInSeries',
    #             'games.game_data.dates.games.homeRuns',
    #             '-games.game_data.dates.games.homeRuns.matchup.batter.stats',
    #             'games.game_data.dates.games.lineups',
    #             'games.game_data.dates.games.scoringPlays',
    #             'games.game_data.dates.games.story',
    #             'games.game_data.dates.games.teams',
    #             'games.game_data.dates.games.venue',
    #             'games.game_data.dates.games.weather',
    #         ))
    #             for ug in focus_user.attended_games if ug.games and ug.games.season == season),
    #         key=lambda x: x.get("games", {}).get("date", ""),
    #         reverse=False
    #     )
