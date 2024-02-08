# * desc: Given an integer n, return the least number of perfect square numbers that sum to n.

# A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

# Example 1: =>
# Input: n = 12
# Output: 3
# Explanation: 12 = 4 + 4 + 4.

# Example 2: =>
# Input: n = 13
# Output: 2
# Explanation: 13 = 4 + 9.

# Constraints: =>
# 1 <= n <= 104


class Solution:
    def numSquares(self, n: int) -> int:
        p_sq = []
        i = 1
        while i * i <= n:
            p_sq.append(i * i)
            i += 1

        currSteps = 0
        queue = [0]
        visited = set()

        while len(queue) > 0:
            len_q = len(queue)

            for i in range(len_q):
                curr_iter = queue.pop(0)

                for i in range(len(p_sq)):
                    if curr_iter + p_sq[i] == n:
                        return currSteps + 1

                    if curr_iter + p_sq[i] > n:
                        break

                    nextStep = curr_iter + p_sq[i]

                    if nextStep not in visited:
                        visited.add(nextStep)
                        queue.append(nextStep)

            currSteps += 1

        return 1
