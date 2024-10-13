# https://leetcode.com/problems/maximum-population-year/

class Solution:
    def maximumPopulation(self, logs: list[list[int]]) -> int:
        pops = []

        for start, end in logs:
            pops.append((start, 1))
            pops.append((end, -1))

        pops.sort()

        max_pops = 0
        curr_pops = 0
        min_year = 0

        for year, val in pops:
            curr_pops += val

            if curr_pops > max_pops:
                max_pops = curr_pops
                min_year = year

        return min_year
