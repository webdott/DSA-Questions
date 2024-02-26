import math


# You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

# Example 1: =>
# Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
# Output: 700
# Explanation:
# The graph is shown above.
# The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
# Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.

# Example 2: =>
# Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
# Output: 200
# Explanation:
# The graph is shown above.
# The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.

# Example 3: =>
# Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
# Output: 500
# Explanation:
# The graph is shown above.
# The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.

# Constraints: =>
# 1 <= n <= 100
# 0 <= flights.length <= (n * (n - 1) / 2)
# flights[i].length == 3
# 0 <= fromi, toi < n
# fromi != toi
# 1 <= pricei <= 104
# There will not be any multiple flights between two cities.
# 0 <= src, dst, k < n
# src != dst


class Solution:
    def findCheapestPrice(
        self, n: int, flights: list[list[int]], src: int, dst: int, k: int
    ) -> int:
        adjacency_list = {}

        for flight in flights:
            [from_, to_, price] = flight

            if from_ not in adjacency_list:
                adjacency_list[from_] = []

            adjacency_list[from_].append([to_, price])

        memo = [[-1] * (k + 2) for i in range(n)]

        def dfs(src: int, dst: int, k: int, memo: list[list[int]]) -> int:
            if k < 0:
                return math.inf

            if memo[src][k] != -1:
                return memo[src][k]

            if src == dst:
                return 0

            ans = math.inf

            for next_flight in adjacency_list.get(src, []):
                [next_dst, price] = next_flight

                price_to_dst = price + dfs(next_dst, dst, k - 1, memo)
                ans = min(ans, price_to_dst)

            memo[src][k] = ans
            return ans

        ans = dfs(src, dst, k + 1, memo)

        return -1 if ans == math.inf else ans
