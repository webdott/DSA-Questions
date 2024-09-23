# You are given a 0-indexed string s and a dictionary of words dictionary. You have to break s into one or more non-overlapping substrings such that each substring is present in dictionary. There may be some extra characters in s which are not present in any of the substrings.

# Return the minimum number of extra characters left over if you break up s optimally.

# Example 1: =>
# Input: s = "leetscode", dictionary = ["leet","code","leetcode"]
# Output: 1
# Explanation: We can break s in two substrings: "leet" from index 0 to 3 and "code" from index 5 to 8. There is only 1 unused character (at index 4), so we return 1.

# Example 2: =>
# Input: s = "sayhelloworld", dictionary = ["hello","world"]
# Output: 3
# Explanation: We can break s in two substrings: "hello" from index 3 to 7 and "world" from index 8 to 12. The characters at indices 0, 1, 2 are not used in any substring and thus are considered as extra characters. Hence, we return 3.

# Constraints: =>
# 1 <= s.length <= 50
# 1 <= dictionary.length <= 50
# 1 <= dictionary[i].length <= 50
# dictionary[i] and s consists of only lowercase English letters
# dictionary contains distinct words

import math


class Trie:
    def __init__(self):
        self.dictionary = {}

    def addToTrie(self, word: str):
        curr = self.dictionary

        for char in word:
            if char not in curr:
                curr[char] = {}

            curr = curr[char]

        curr["end"] = True

    def getIdxOfWordEnd(self, word: str):
        curr = self.dictionary

        idxs = []

        for i in range(len(word)):
            char = word[i]

            if char not in curr:
                return idxs

            curr = curr[char]

            if "end" in curr:
                idxs.append(i)

        return idxs


class Solution:
    def minExtraChar(self, s: str, dictionary: list[str]) -> int:
        def dp(idx: int, n: int, s: str, trie, cache) -> int:
            if idx >= n:
                return 0

            if cache[idx] > -1:
                return cache[idx]

            min_extra = math.inf

            # take
            cut_idxs = trie.getIdxOfWordEnd(s[idx:])

            for cut_idx in cut_idxs:
                min_extra = min(min_extra, dp(idx + cut_idx + 1, n, s, trie, cache))

            # leave
            min_extra = min(min_extra, 1 + dp(idx + 1, n, s, trie, cache))

            cache[idx] = min_extra
            return cache[idx]

        trie = Trie()

        for word in dictionary:
            trie.addToTrie(word)

        n = len(s)
        cache = [-1] * n

        return dp(0, n, s, trie, cache)
