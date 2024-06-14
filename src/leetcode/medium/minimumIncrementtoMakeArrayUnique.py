# You are given an integer array nums. In one move, you can pick an index i where 0 <= i < nums.length and increment nums[i] by 1.

# Return the minimum number of moves to make every value in nums unique.

# The test cases are generated so that the answer fits in a 32-bit integer.

# Example 1: =>
# Input: nums = [1,2,2]
# Output: 1
# Explanation: After 1 move, the array could be [1, 2, 3].

# Example 2: =>
# Input: nums = [3,2,1,2,1,7]
# Output: 6
# Explanation: After 6 moves, the array could be [3, 4, 1, 2, 5, 7].
# It can be shown with 5 or less moves that it is impossible for the array to have all unique values.

# Constraints: =>
# 1 <= nums.length <= 105
# 0 <= nums[i] <= 105


class Solution:
    def minIncrementForUnique(self, nums: list[int]) -> int:
        nums.sort()

        prev_num = -1
        min_incre = 0

        for i in range(len(nums)):
            if prev_num >= nums[i]:
                incre = (prev_num - nums[i]) + 1
                min_incre += incre
                prev_num = nums[i] + incre
            else:
                prev_num = nums[i]

        return min_incre
