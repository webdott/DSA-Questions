# Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.

# Example 1: =>
# Input: num = "1432219", k = 3
# Output: "1219"
# Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

# Example 2: =>
# Input: num = "10200", k = 1
# Output: "200"
# Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

# Example 3: =>
# Input: num = "10", k = 2
# Output: "0"
# Explanation: Remove all the digits from the number and it is left with nothing which is 0.

# Constraints: =>
# 1 <= k <= num.length <= 105
# num consists of only digits.
# num does not have any leading zeros except for the zero itself.


class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        n = len(num)

        if k >= n:
            return "0"

        mono_stack = []

        for i, digit in enumerate(num):
            m = len(mono_stack)

            # while current digit is less than the last element in stack,
            # and we can still have a valid combination after removing from stack, pop last element
            while m > 0 and (m + (n - i - 1) >= n - k) and digit < mono_stack[-1]:
                mono_stack.pop()
                m = len(mono_stack)

            # if mono_stack has less than the desired amount after removing k characters, add current digit to stack
            if m < n - k:
                mono_stack.append(digit)

        # strip all 0s from front of stack
        ans = "".join(mono_stack).lstrip("0")

        return "0" if ans == "" else ans
