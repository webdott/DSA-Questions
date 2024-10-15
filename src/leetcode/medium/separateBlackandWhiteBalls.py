# https://leetcode.com/problems/separate-black-and-white-balls/description/

class Solution:
    def minimumSteps(self, s: str) -> int:
        n = len(s)

        left, right = 0, n - 1

        min_steps = 0

        while left < right:
            if s[left] == "0":
                left += 1

            if s[right] == "1":
                right -= 1

            if s[left] == "1" and s[right] == "0" and right > left:
                min_steps += (right - left)
                left += 1
                right -= 1

        return min_steps

