# You are given an m x n binary matrix grid.

# A move consists of choosing any row or column and toggling each value in that row or column (i.e., changing all 0's to 1's, and all 1's to 0's).

# Every row of the matrix is interpreted as a binary number, and the score of the matrix is the sum of these numbers.

# Return the highest possible score after making any number of moves (including zero moves).

# Example 1: =>
# Input: grid = [[0,0,1,1],[1,0,1,0],[1,1,0,0]]
# Output: 39
# Explanation: 0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39

# Example 2: =>
# Input: grid = [[0]]
# Output: 1

# Constraints: =>
# m == grid.length
# n == grid[i].length
# 1 <= m, n <= 20
# grid[i][j] is either 0 or 1.

from typing import List


class Solution:
    def matrixScore(self, grid: List[List[int]]) -> int:
        def inverseRow(grid: List[List[int]], rowIdx: int):
            for i in range(len(grid[rowIdx])):
                grid[rowIdx][i] = 0 if grid[rowIdx][i] == 1 else 1

        def inverseCol(grid: List[List[int]], colIdx: int):
            for i in range(rows):
                grid[i][colIdx] = 0 if grid[i][colIdx] == 1 else 1

        rows = len(grid)
        cols = len(grid[0])

        for i in range(rows):
            if grid[i][0] == 0:
                inverseRow(grid, i)

        for i in range(cols):
            countZero = 0
            countOne = 0

            for j in range(rows):
                if grid[j][i] == 0:
                    countZero += 1
                else:
                    countOne += 1

            if countZero > countOne:
                inverseCol(grid, i)

        maxScore = 0

        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == 1:
                    maxScore += pow(2, cols - 1 - j)

        return maxScore
