# Given a string s, partition s such that every
# substring
#  of the partition is a
# palindrome
# . Return all possible palindrome partitioning of s.

# Example 1: =>
# Input: s = "aab"
# Output: [["a","a","b"],["aa","b"]]

# Example 2: =>
# Input: s = "a"
# Output: [["a"]]

# Constraints: =>
# 1 <= s.length <= 16
# s contains only lowercase English letters.


class Solution:
    def partition(self, s: str) -> list[list[str]]:
        self.all_partitions = []

        def isPalindrome(s: list[str]) -> bool:
            if len(s) == 0:
                return False

            left, right = 0, len(s) - 1

            while left <= right:
                if s[left] != s[right]:
                    return False

                left += 1
                right -= 1

            return True

        def allPartitions(idx: int, s: str, curr: list[list[str]]):
            if idx == len(s):
                self.all_partitions.append(curr[:])
                return

            for end in range(idx + 1, len(s) + 1):
                if isPalindrome(s[idx:end]):
                    curr.append(s[idx:end])
                    allPartitions(end, s, curr)
                    curr.pop()

        allPartitions(0, s, [])

        return self.all_partitions
