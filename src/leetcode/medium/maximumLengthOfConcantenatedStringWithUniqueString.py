# Desc: You are given an array of strings arr. A string s is formed by the concatenation of a subsequence of arr that has unique characters.

# Return the maximum possible length of s.

# A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

# Example 1: =>
# Input: arr = ["un","iq","ue"]
# Output: 4
# Explanation: All the valid concatenations are:
# - ""
# - "un"
# - "iq"
# - "ue"
# - "uniq" ("un" + "iq")
# - "ique" ("iq" + "ue")
# Maximum length is 4.

# Example 2: =>
# Input: arr = ["cha","r","act","ers"]
# Output: 6
# Explanation: Possible longest valid concatenations are "chaers" ("cha" + "ers") and "acters" ("act" + "ers").

# Example 3: =>
# Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
# Output: 26
# Explanation: The only string in arr has all 26 characters.

# Constraints: =>
# 1 <= arr.length <= 16
# 1 <= arr[i].length <= 26
# arr[i] contains only lowercase English letters.


class Solution:
    def __init__(self):
        self.max_length = 0

    def getCharIndex(self, char: str) -> int:
        return ord(char) - ord("a")

    def helper(self, idx: int, arr: list[str], currList: list[int]):
        def condition(x):
            return x == 1

        if idx == len(arr):
            # get the maximum between current length and length of concactenated string (all characters in the list that are 1)
            self.max_length = max(self.max_length, sum(condition(x) for x in currList))
            return

        # create a new list for if we choose this character
        newCurrList = currList[:]
        choose = True
        for char in arr[idx]:
            listIdx = self.getCharIndex(char)
            if newCurrList[listIdx] == 1:
                choose = False
                break
            else:
                newCurrList[listIdx] = 1

        # choose if there are no repeating characters in the current string
        if choose is True:
            self.helper(idx + 1, arr, newCurrList)

        # not choose
        self.helper(idx + 1, arr, currList)

    def maxLength(self, arr: list[str]) -> int:
        self.helper(0, arr, [0] * 26)

        return self.max_length
