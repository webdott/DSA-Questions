# https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/

from typing import List

class SolutionTimeOut:
    def minGroups(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: (x[0], -x[1]))

        groups = []

        for interval in intervals:
            added = False

            for i, (start, end) in enumerate(groups):
                if start <= interval[1] and end >= interval[0]:
                    continue
                else:
                    groups[i] = (min(start, interval[0]), max(end, interval[1]))
                    added = True
                    break

            if not added:
                groups.append((interval[0], interval[1]))

        return len(groups)

class Solution:
    def minGroups(self, intervals: List[List[int]]) -> int:
        #  using diff array
        max_num = max(end for _, end in intervals)

        diff_arr = [0] * (max_num + 2)

        for start, end in intervals:
            diff_arr[start] += 1
            diff_arr[end + 1] -= 1

        curr, consec, n = 0, 0, len(diff_arr)
        
        for i in range(1, n):
            curr += diff_arr[i]

            consec = max(consec, curr)

        return consec
