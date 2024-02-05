#     desc: Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

#     Example 1: =>
#     Input: s = "leetcode"
#     Output: 0

#     Example 2: =>
#     Input: s = "loveleetcode"
#     Output: 2

#     Example 3: =>
#     Input: s = "aabb"
#     Output: -1

#     Constraints: =>
#     1 <= s.length <= 105
#     s consists of only lowercase English letters.


class Solution:
    def firstUniqChar(self, s: str) -> int:
        freq_map = {}

        for i in range(len(s)):
            char = s[i]

            if s[i] in freq_map:
                freq_map[char][0] += 1
            else:
                freq_map[char] = [1, i]

        for val in freq_map.values():
            if val[0] == 1:
                return val[1]

        return -1
