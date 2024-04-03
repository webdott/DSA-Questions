# * desc: Given an m x n grid of characters board and a string word, return true if word exists in the grid.

# The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

# Example 1: =>
# Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
# Output: true

# Example 2: =>
# Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
# Output: true

# Example 3: =>
# Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
# Output: false

# Constraints: =>
# m == board.length
# n = board[i].length
# 1 <= m, n <= 6
# 1 <= word.length <= 15
# board and word consists of only lowercase and uppercase English letters.

# Follow up: Could you use search pruning to make your solution faster with a larger board?


class Solution:
    def nextNeighs(self, row: int, col: int):
        return [
            [row - 1, col],
            [row, col + 1],
            [row + 1, col],
            [row, col - 1],
        ]

    def dfs(
        self,
        board: list[list[str]],
        word: str,
        row: int,
        col: int,
        m: int,
        n: int,
        wordIdx: int,
    ):
        if wordIdx >= len(word):
            return True

        if row < 0 or row >= m or col < 0 or col >= n:
            return False

        currWord = board[row][col]

        if currWord != word[wordIdx]:
            return False

        ans = False

        board[row][col] = "."

        for [nextRow, nextCol] in self.nextNeighs(row, col):
            ans |= self.dfs(board, word, nextRow, nextCol, m, n, wordIdx + 1)

        board[row][col] = currWord

        return ans

    def exist(self, board: list[list[str]], word: str) -> bool:
        m = len(board)
        n = len(board[0])

        for i in range(m):
            for j in range(n):
                if board[i][j] == word[0]:
                    if self.dfs(board, word, i, j, m, n, 0):
                        return True

        return False
