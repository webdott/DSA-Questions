# https://leetcode.com/problems/maximum-xor-for-each-query/

from typing import List


class Solution:
    def getMaximumXor(self, nums: List[int], maximumBit: int) -> List[int]:
        prefix_xors = []
        max_num = (2 ** maximumBit) - 1
        n = len(nums)

        for num in nums:
            if not prefix_xors:
                prefix_xors.append(num)

            else:
                prefix_xors.append(prefix_xors[-1] ^ num)

        res = []

        for i, num in enumerate(nums):
            res.append(prefix_xors[n - i - 1] ^ max_num)

        return res

            