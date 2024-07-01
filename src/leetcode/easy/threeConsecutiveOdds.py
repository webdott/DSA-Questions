# Given an integer array arr, return true if there are three consecutive odd numbers in the array. Otherwise, return false.

# Example 1: =>
# Input: arr = [2,6,4,1]
# Output: false
# Explanation: There are no three consecutive odds.

# Example 2: =>
# Input: arr = [1,2,34,3,4,5,7,23,12]
# Output: true
# Explanation: [5,7,23] are three consecutive odds.

# Constraints: =>
# 1 <= arr.length <= 1000
# 1 <= arr[i] <= 1000

from typing import List


class Solution:
    def threeConsecutiveOdds(self, arr: List[int]) -> bool:
        count = 0

        for num in arr:
            if num % 2 > 0:
                count += 1
            else:
                count = 0

            if count == 3:
                return True

        return False


class Solution2:
    def threeConsecutiveOdds(self, arr: List[int]) -> bool:
        count, start = 0, 0

        for r in range(len(arr)):
            if arr[r] % 2 > 0:
                count += 1

            if r - start == 2:
                if count == 3:
                    return True
                if arr[start] % 2 > 0:
                    count -= 1
                start += 1

        return False
