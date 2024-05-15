# You are given a 0-indexed 2D matrix grid of size n x n, where (r, c) represents:

# A cell containing a thief if grid[r][c] = 1
# An empty cell if grid[r][c] = 0
# You are initially positioned at cell (0, 0). In one move, you can move to any adjacent cell in the grid, including cells containing thieves.

# The safeness factor of a path on the grid is defined as the minimum manhattan distance from any cell in the path to any thief in the grid.

# Return the maximum safeness factor of all paths leading to cell (n - 1, n - 1).

# An adjacent cell of cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) and (r - 1, c) if it exists.

# The Manhattan distance between two cells (a, b) and (x, y) is equal to |a - x| + |b - y|, where |val| denotes the absolute value of val.

# Example 1: =>
# Input: grid = [[1,0,0],[0,0,0],[0,0,1]]
# Output: 0
# Explanation: All paths from (0, 0) to (n - 1, n - 1) go through the thieves in cells (0, 0) and (n - 1, n - 1).

# Example 2: =>
# Input: grid = [[0,0,1],[0,0,0],[0,0,0]]
# Output: 2
# Explanation: The path depicted in the picture above has a safeness factor of 2 since:
# - The closest cell of the path to the thief at cell (0, 2) is cell (0, 0). The distance between them is | 0 - 0 | + | 0 - 2 | = 2.
# It can be shown that there are no other paths with a higher safeness factor.

# Example 3: =>
# Input: grid = [[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]
# Output: 2
# Explanation: The path depicted in the picture above has a safeness factor of 2 since:
# - The closest cell of the path to the thief at cell (0, 3) is cell (1, 2). The distance between them is | 0 - 1 | + | 3 - 2 | = 2.
# - The closest cell of the path to the thief at cell (3, 0) is cell (3, 2). The distance between them is | 3 - 3 | + | 0 - 2 | = 2.
# It can be shown that there are no other paths with a higher safeness factor.

# Constraints: =>
# 1 <= grid.length == n <= 400
# grid[i].length == n
# grid[i][j] is either 0 or 1.
# There is at least one thief in the grid.

from collections import deque


class Solution:
    def maximumSafenessFactor(self, grid: list[list[int]]) -> int:
        DIRECTIONS = [0, 1, 0, -1, 0]

        def isValidCell(grid: list[list[int]], row: int, col: int) -> bool:
            n = len(grid)
            return 0 <= row < n and 0 <= col < n

        def isValidSafeness(grid: list[list[int]], min_safeness: int) -> bool:
            n, q, visited = len(grid), deque([]), [[0 for col in row] for row in grid]

            if grid[0][0] < min_safeness or grid[n - 1][n - 1] < min_safeness:
                return False

            q.append([0, 0])
            visited[0][0] = 1

            while q:
                [row, col] = q.popleft()

                for i in range(4):
                    nextRow, nextCol = row + DIRECTIONS[i], col + DIRECTIONS[i + 1]

                    if nextRow == n - 1 and nextCol == n - 1:
                        return True

                    if (
                        isValidCell(grid, nextRow, nextCol)
                        and visited[nextRow][nextCol] == 0
                        and grid[nextRow][nextCol] >= min_safeness
                    ):
                        visited[nextRow][nextCol] = 1
                        q.append([nextRow, nextCol])

            return False

        n, thieves = len(grid), deque([])

        for i in range(n):
            for j in range(n):
                if grid[i][j] == 1:
                    thieves.append([i, j])
                    grid[i][j] = 0
                else:
                    grid[i][j] = -1

        while thieves:
            size = len(thieves)

            for i in range(size):
                [row, col] = thieves.popleft()

                for i in range(4):
                    nextRow, nextCol = row + DIRECTIONS[i], col + DIRECTIONS[i + 1]

                    if (
                        isValidCell(grid, nextRow, nextCol)
                        and grid[nextRow][nextCol] == -1
                    ):
                        grid[nextRow][nextCol] = grid[row][col] + 1
                        thieves.append([nextRow, nextCol])

        start, end, res = 0, 0, 0

        for i in range(n):
            for j in range(n):
                end = max(end, grid[i][j])

        while start <= end:
            mid = start + ((end - start) // 2)

            if isValidSafeness(grid, mid):
                res = max(res, mid)
                start = mid + 1
            else:
                end = mid - 1

        return res
