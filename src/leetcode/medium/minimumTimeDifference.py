# Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.

# Example 1: =>
# Input: timePoints = ["23:59","00:00"]
# Output: 1

# Example 2: =>
# Input: timePoints = ["00:00","23:59","00:00"]
# Output: 0

# Constraints: =>
# 2 <= timePoints.length <= 2 * 104
# timePoints[i] is in the format "HH:MM".


from typing import List


class Solution:
    def findMinDifference(self, timePoints: List[str]) -> int:
        n = len(timePoints)
        timePoints.sort()

        min_time = 5000

        for idx in range(n):
            h_a, m_a = timePoints[idx].split(":")
            h_b, m_b = timePoints[idx + 1 if idx < n - 1 else 0].split(":")

            min_a = (int(h_a) * 60) + int(m_a)
            min_b = ((int(h_b) + (0 if idx < n - 1 else 24)) * 60) + int(m_b)

            min_time = min(min_time, abs(min_a - min_b))

        return min_time
