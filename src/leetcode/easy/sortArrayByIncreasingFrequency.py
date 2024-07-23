from collections import Counter
from typing import List


class Solution:
    def frequencySort(self, nums: List[int]) -> List[int]:
        freq_map = Counter(nums)

        return sorted(nums, key=lambda x: (freq_map[x], -x))
