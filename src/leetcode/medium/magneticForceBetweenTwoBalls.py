# In the universe Earth C-137, Rick discovered a special form of magnetic force between two balls if they are put in his new invented basket. Rick has n empty baskets, the ith basket is at position[i], Morty has m balls and needs to distribute the balls into the baskets such that the minimum magnetic force between any two balls is maximum.

# Rick stated that magnetic force between two different balls at positions x and y is |x - y|.

# Given the integer array position and the integer m. Return the required force.

# Example 1: =>
# Input: position = [1,2,3,4,7], m = 3
# Output: 3
# Explanation: Distributing the 3 balls into baskets 1, 4 and 7 will make the magnetic force between ball pairs [3, 3, 6]. The minimum magnetic force is 3. We cannot achieve a larger minimum magnetic force than 3.

# Example 2: =>
# Input: position = [5,4,3,2,1,1000000000], m = 2
# Output: 999999999
# Explanation: We can use baskets 1 and 1000000000.

# Constraints: =>
# n == position.length
# 2 <= n <= 105
# 1 <= position[i] <= 109
# All integers in position are distinct.
# 2 <= m <= position.length


class Solution:
    def isPossible(self, gap: int, positions: list[int], m: int) -> bool:
        next_n = positions[0] + gap
        m -= 1

        for position in positions:
            if position >= next_n:
                m -= 1
                next_n = position + gap

        return m <= 0

    def maxDistance(self, position: list[int], m: int) -> int:
        position.sort()
        start, end, ans = 1, position[-1] // (m - 1), -1

        while start <= end:
            mid = (start + end) // 2

            if self.isPossible(mid, position, m):
                ans = mid
                start = mid + 1
            else:
                end = mid - 1

        return ans
