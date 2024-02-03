# Given an integer array arr, partition the array into (contiguous) subarrays of length at most k. After partitioning, each subarray has their values changed to become the maximum value of that subarray.

# Return the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a 32-bit integer.

# Example 1: =>
# Input: arr = [1,15,7,9,2,5,10], k = 3
# Output: 84
# Explanation: arr becomes [15,15,15,9,10,10,10]

# Example 2: =>
# Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
# Output: 83

# Example 3: =>
# Input: arr = [1], k = 1
# Output: 1

# Constraints: =>
# 1 <= arr.length <= 500
# 0 <= arr[i] <= 109
# 1 <= k <= arr.length


class Solution:
    def helper(self, start: int, dp: List[int], arr: List[int], k: int):
        if start >= len(arr):
            return 0

        if dp[start] != -1:
            return dp[start]

        curr_max = 0
        ans = 0

        for i in range(start, min(start + k, len(arr))):
            curr_max = max(curr_max, arr[i])

            ans = max(
                ans, (curr_max * (i - start + 1)) + self.helper(i + 1, dp, arr, k)
            )

        dp[start] = ans
        return ans

    def maxSumAfterPartitioning(self, arr: List[int], k: int) -> int:
        return self.helper(0, [-1] * len(arr), arr, k)
