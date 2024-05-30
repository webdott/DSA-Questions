# Given an array of integers arr.

# We want to select three indices i, j and k where (0 <= i < j <= k < arr.length).

# Let's define a and b as follows:

# a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
# b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
# Note that ^ denotes the bitwise-xor operation.

# Return the number of triplets (i, j and k) Where a == b.

# Example 1: =>
# Input: arr = [2,3,1,6,7]
# Output: 4
# Explanation: The triplets are (0,1,2), (0,2,2), (2,3,4) and (2,4,4)

# Example 2: =>
# Input: arr = [1,1,1,1,1]
# Output: 10

# Constraints: =>
# 1 <= arr.length <= 300
# 1 <= arr[i] <= 108


class Solution:
    def getXorOfRange(self, pSumArr: list[int], start: int, end: int) -> int:
        return pSumArr[start] ^ pSumArr[end + 1]

    def countTriplets(self, arr: list[int]) -> int:
        n = len(arr)

        prefix_sum = [0] * (n + 1)

        for i, num in enumerate(arr):
            prefix_sum[i + 1] = prefix_sum[i] ^ num

        all_triplets = 0

        for i in range(n - 1):
            for j in range(i + 1, n):
                for k in range(j, n):
                    a = self.getXorOfRange(prefix_sum, i, j - 1)
                    b = self.getXorOfRange(prefix_sum, j, k)

                    if a == b:
                        # print(i, j, k)
                        all_triplets += 1

        return all_triplets
