# * desc: Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

# A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position (row, col) will be (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).

# Example 1: =>
# Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
# Output: 13
# Explanation: There are two falling paths with a minimum sum as shown.

# Example 2: =>
# Input: matrix = [[-19,57],[-40,-5]]
# Output: -59
# Explanation: The falling path with a minimum sum is shown.

# Constraints: =>
# n == matrix.length == matrix[i].length
# 1 <= n <= 100
# -100 <= matrix[i][j] <= 100

import math


class Solution:
    def __init__(self):
        self.cache = []

    def dp(self, row: int, col: int, rows: int, cols: int, mat: list[list[int]]) -> int:
        if col < 0 or col == cols:
            return math.inf

        if row == rows - 1:
            return mat[row][col]

        if self.cache[row][col] is not None:
            return self.cache[row][col]

        min_path_sum = math.inf

        next_steps = self.getNextSteps(row, col)

        for next_step in next_steps:
            [next_row, next_col] = next_step
            min_path_sum = min(
                min_path_sum, self.dp(next_row, next_col, rows, cols, mat)
            )

        min_path_sum += mat[row][col]
        self.cache[row][col] = min_path_sum
        return min_path_sum

    def getNextSteps(self, row: int, col: int):
        return [[row + 1, col - 1], [row + 1, col], [row + 1, col + 1]]

    def minFallingPathSum(self, matrix: list[list[int]]) -> int:
        rows = len(matrix)
        cols = len(matrix[0])
        self.cache = [[None for i in range(cols)] for j in range(rows)]

        min_falling_path_sum = math.inf

        for col in range(cols):
            min_falling_path_sum = min(
                min_falling_path_sum, self.dp(0, col, rows, cols, matrix)
            )

        return min_falling_path_sum
