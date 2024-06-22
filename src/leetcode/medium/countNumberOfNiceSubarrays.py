# Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.

# Return the number of nice sub-arrays.

# Example 1: =>
# Input: nums = [1,1,2,1,1], k = 3
# Output: 2
# Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].

# Example 2: =>
# Input: nums = [2,4,6], k = 1
# Output: 0
# Explanation: There are no odd numbers in the array.

# Example 3: =>
# Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
# Output: 16


class Solution:
    def numberOfSubarrays(self, nums: list[int], k: int) -> int:
        curr_odd, odds, ans = 0, [], 0

        for i in range(len(nums)):
            if nums[i] % 2 > 0:
                curr_odd += 1

                odds.append(i)

            # add all even numbers in between the start of current odd numbers and the start of previous odd numbers (mimicking sliding window)
            if curr_odd >= k:
                main_idx = max(0, len(odds) - k)
                ans += odds[main_idx] - (-1 if main_idx <= 0 else odds[main_idx - 1])

        return ans
