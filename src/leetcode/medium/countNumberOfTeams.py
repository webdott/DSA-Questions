# There are n soldiers standing in a line. Each soldier is assigned a unique rating value.

# You have to form a team of 3 soldiers amongst them under the following rules:

# Choose 3 soldiers with index (i, j, k) with rating (rating[i], rating[j], rating[k]).
# A team is valid if: (rating[i] < rating[j] < rating[k]) or (rating[i] > rating[j] > rating[k]) where (0 <= i < j < k < n).
# Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).

# Example 1: =>
# Input: rating = [2,5,3,4,1]
# Output: 3
# Explanation: We can form three teams given the conditions. (2,3,4), (5,4,1), (5,3,1).

# Example 2: =>
# Input: rating = [2,1,3]
# Output: 0
# Explanation: We can't form any team given the conditions.

# Example 3: =>
# Input: rating = [1,2,3,4]
# Output: 4

# Constraints: =>
# n == rating.length
# 3 <= n <= 1000
# 1 <= rating[i] <= 105
# All the integers in rating are unique.

from typing import List


class Solution:
    def countOfIncreasingFromIndex(
        self,
        start_idx: int,
        team_length: int,
        rating: List[int],
        cache: List[List[int]],
    ) -> int:
        n = len(rating)

        if start_idx == n:
            return 0

        if team_length == 3:
            return 1

        if cache[start_idx][team_length] > -1:
            return cache[start_idx][team_length]

        no_teams = 0

        for i in range(start_idx + 1, n):
            if rating[i] > rating[start_idx]:
                no_teams += self.countOfIncreasingFromIndex(
                    i, team_length + 1, rating, cache
                )

        cache[start_idx][team_length] = no_teams
        return no_teams

    def countOfDecreasingFromIndex(
        self,
        start_idx: int,
        team_length: int,
        rating: List[int],
        cache: List[List[int]],
    ) -> int:
        n = len(rating)

        if start_idx == n:
            return 0

        if team_length == 3:
            return 1

        if cache[start_idx][team_length] > -1:
            return cache[start_idx][team_length]

        no_teams = 0

        for i in range(start_idx + 1, n):
            if rating[i] < rating[start_idx]:
                no_teams += self.countOfDecreasingFromIndex(
                    i, team_length + 1, rating, cache
                )

        cache[start_idx][team_length] = no_teams
        return no_teams

    def numTeams(self, rating: List[int]) -> int:
        n = len(rating)

        increasing_from_idx = [[-1] * 3 for _ in range(n)]
        decreasing_from_idx = [[-1] * 3 for _ in range(n)]

        no_teams = 0

        for i in range(n):
            no_teams += self.countOfIncreasingFromIndex(
                i, 1, rating, increasing_from_idx
            ) + self.countOfDecreasingFromIndex(i, 1, rating, decreasing_from_idx)

        return no_teams
