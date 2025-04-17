# Description: https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array/description/?envType=daily-question&envId=2025-04-17

from collections import defaultdict

class Solution:
    def countPairs(self, nums: list[int], k: int) -> int:
        freq = defaultdict(list)

        for idx, num in enumerate(nums):
            freq[num].append(idx)

        res = 0

        for _, value in freq.items():
            for i in range(len(value) - 1):
                for j in range(i + 1, len(value)):
                    if value[i] * value[j] % k == 0:
                        res += 1

        return res