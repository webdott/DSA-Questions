# There is an m x n grid with a ball. The ball is initially at the position [startRow, startColumn]. You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). You can apply at most maxMove moves to the ball.

# Given the five integers m, n, maxMove, startRow, startColumn, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it modulo 109 + 7.

# Example 1: =>
# Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
# Output: 6

# Example 2: =>
# Input: m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
# Output: 12

# Constraints: =>
# 1 <= m, n <= 50
# 0 <= maxMove <= 50
# 0 <= startRow < m
# 0 <= startColumn < n


class Solution:
    def getNextPositions(self, row: int, col: int):
        return [[row - 1, col], [row, col + 1], [row + 1, col], [row, col - 1]]

    def dp(
        self, rows: int, cols: int, maxMove: int, row: int, col: int, cache: dict
    ) -> int:
        MODULO = (10**9) + 7

        # return 0 once ball can't move again
        if maxMove < 0:
            return 0

        # return one when out of boundary
        if row == rows or col == cols or row < 0 or col < 0:
            return 1

        key = str(row) + "-" + str(col) + "-" + str(maxMove)

        if key in cache:
            return cache[key]

        num_moves_out = 0

        for next_position in self.getNextPositions(row, col):
            [next_row, next_col] = next_position

            num_moves_out += self.dp(rows, cols, maxMove - 1, next_row, next_col, cache)
            num_moves_out %= MODULO

        cache[key] = num_moves_out
        return num_moves_out

    def findPaths(
        self, m: int, n: int, maxMove: int, startRow: int, startColumn: int
    ) -> int:
        cache = {}

        return self.dp(m, n, maxMove, startRow, startColumn, cache)
