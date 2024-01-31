from collections import Counter


class Helpers():
    def count_occurrences(names_list):
        name_counts = {}

        for name in names_list:
            name_counts[name] = name_counts.get(name, 0) + 1

        return name_counts

    def top_filter(names_list, number):
        player_counts = Counter(names_list)

        # Get the top 10 players
        top_10_players = player_counts.most_common(number)

        # Convert to a dictionary
        return dict(top_10_players)
