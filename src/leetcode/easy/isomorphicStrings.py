# Given two strings s and t, determine if they are isomorphic.

# Two strings s and t are isomorphic if the characters in s can be replaced to get t.

# All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

# Example 1: =>
# Input: s = "egg", t = "add"
# Output: true

# Example 2: =>
# Input: s = "foo", t = "bar"
# Output: false

# Example 3: =>
# Input: s = "paper", t = "title"
# Output: true

# Constraints: =>
# 1 <= s.length <= 5 * 104
# t.length == s.length
# s and t consist of any valid ascii character.


class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        hash_map1 = {}
        hash_map2 = {}

        for i, char in enumerate(s):
            if char in hash_map1 or t[i] in hash_map2:
                char_key = hash_map1.get(char, "")
                t_key = hash_map2.get(t[i], "")

                if char_key != t[i] or t_key != char:
                    return False

            hash_map1[char] = t[i]
            hash_map2[t[i]] = char

        return True
