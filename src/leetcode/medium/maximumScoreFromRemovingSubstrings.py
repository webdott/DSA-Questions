# You are given a string s and two integers x and y. You can perform two types of operations any number of times.

# Remove substring "ab" and gain x points.
# For example, when removing "ab" from "cabxbae" it becomes "cxbae".
# Remove substring "ba" and gain y points.
# For example, when removing "ba" from "cabxbae" it becomes "cabxe".
# Return the maximum points you can gain after applying the above operations on s.

# Example 1: =>
# Input: s = "cdbcbbaaabab", x = 4, y = 5
# Output: 19
# Explanation:
# - Remove the "ba" underlined in "cdbcbbaaabab". Now, s = "cdbcbbaaab" and 5 points are added to the score.
# - Remove the "ab" underlined in "cdbcbbaaab". Now, s = "cdbcbbaa" and 4 points are added to the score.
# - Remove the "ba" underlined in "cdbcbbaa". Now, s = "cdbcba" and 5 points are added to the score.
# - Remove the "ba" underlined in "cdbcba". Now, s = "cdbc" and 5 points are added to the score.
# Total score = 5 + 4 + 5 + 5 = 19.

# Example 2: =>
# Input: s = "aabbaaxybbaabb", x = 5, y = 4
# Output: 20

# Constraints: =>
# 1 <= s.length <= 105
# 1 <= x, y <= 104
# s consists of lowercase English letters.


class Solution:
    def maximumGain(self, s: str, x: int, y: int) -> int:
        def getGain(s: str, favoured: str, other: str, more: int, less: int):
            total = 0
            stack = []

            for char in s:
                if char == favoured:
                    if stack and stack[-1] == other:
                        stack.pop()
                        total += more
                    else:
                        stack.append(char)
                else:
                    stack.append(char)

            other_stack = []

            for char in stack:
                if char == other:
                    if other_stack and other_stack[-1] == favoured:
                        other_stack.pop()
                        total += less
                    else:
                        other_stack.append(char)
                else:
                    other_stack.append(char)

            return total

        if x > y:
            return getGain(s, "b", "a", x, y)
        elif y > x:
            return getGain(s, "a", "b", y, x)
        else:
            return max(getGain(s, "b", "a", x, y), getGain(s, "a", "b", y, x))
