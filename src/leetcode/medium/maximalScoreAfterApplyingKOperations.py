# https://leetcode.com/problems/maximal-score-after-applying-k-operations/

import heapq
from typing import List


class Solution:
    def maxKelements(self, nums: List[int], k: int) -> int:
        heap = []

        for num in nums:
            heapq.heappush(heap, -num)

        max_score = 0

        while k > 0:
            num = heapq.heappop(heap)

            max_score += -num

            heapq.heappush(heap, int(num // 3))

            k -= 1

        return max_score