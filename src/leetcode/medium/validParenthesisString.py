# Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

# The following rules define a valid string:

# Any left parenthesis '(' must have a corresponding right parenthesis ')'.
# Any right parenthesis ')' must have a corresponding left parenthesis '('.
# Left parenthesis '(' must go before the corresponding right parenthesis ')'.
# '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

# Example 1: =>
# Input: s = "()"
# Output: true

# Example 2: =>
# Input: s = "(*)"
# Output: true

# Example 3: =>
# Input: s = "(*))"
# Output: true

# Constraints: =>
# 1 <= s.length <= 100
# s[i] is '(', ')' or '*'.


class Solution:
    def checkValidString(self, s: str) -> bool:
        num_wild = []
        stack = []

        for i, char in enumerate(s):
            if char == "*":
                num_wild.append(i)
            elif char == ")":
                if len(stack) > 0:
                    stack.pop()
                elif len(num_wild) > 0:
                    num_wild.pop()
                else:
                    return False
            else:
                stack.append(i)

        i = 0

        for j in num_wild:
            if i >= len(stack):
                break

            if stack[i] < j:
                i += 1

            j += 1

        return len(stack) == 0 or i == len(stack)
