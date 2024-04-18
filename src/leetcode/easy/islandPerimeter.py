# You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

# Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

# The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

# Example 1: =>
# Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
# Output: 16
# Explanation: The perimeter is the 16 yellow stripes in the image above.

# Example 2: =>
# Input: grid = [[1]]
# Output: 4

# Example 3: =>
# Input: grid = [[1,0]]
# Output: 4

# Constraints: =>
# row == grid.length
# col == grid[i].length
# 1 <= row, col <= 100
# grid[i][j] is 0 or 1.
# There is exactly one island in grid.


class Solution:
    def islandPerimeter(self, grid: list[list[int]]) -> int:
        def isValid(grid, rows, cols, row, col):
            if row < 0 or row >= rows or col < 0 or col >= cols or grid[row][col] == 0:
                return False

            return True

        def dfs(grid, row, col, perimeter, seen):
            perimeter[0] += 4
            seen[row][col] = 1

            for [nxt_row, nxt_col] in [
                [row - 1, col],
                [row, col + 1],
                [row + 1, col],
                [row, col - 1],
            ]:
                if isValid(grid, rows, cols, nxt_row, nxt_col):
                    perimeter[0] -= 1

                    if seen[nxt_row][nxt_col] == 0:
                        dfs(grid, nxt_row, nxt_col, perimeter, seen)

        rows = len(grid)
        cols = len(grid[0])

        perimeter = [0]
        seen = [[0] * cols for n in range(rows)]

        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == 1:
                    dfs(grid, row, col, perimeter, seen)
                    return perimeter[0]
