# * desc: You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

# Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

# Example 1: =>
# Input: nums = [1,2,3,1]
# Output: 4
# Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
# Total amount you can rob = 1 + 3 = 4.

# Example 2: =>
# Input: nums = [2,7,9,3,1]
# Output: 12
# Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
# Total amount you can rob = 2 + 9 + 1 = 12.

# Constraints: =>
# 1 <= nums.length <= 100
# 0 <= nums[i] <= 400


class Solution(object):
    def __init__(self):
        self.cache = {}

    def dp(self, idx, n, nums):
        if idx >= n:
            return 0

        if idx in self.cache:
            return self.cache[idx]

        # rob
        rob = nums[idx] + self.dp(idx + 2, n, nums)

        # no rob
        no_rob = self.dp(idx + 1, n, nums)

        max_amount = max(rob, no_rob)
        self.cache[idx] = max_amount

        return max_amount

    def rob(self, nums):
        n = len(nums)

        return self.dp(0, n, nums)
