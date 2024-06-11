# Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.

# Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. Elements that do not appear in arr2 should be placed at the end of arr1 in ascending order.

# Example 1: =>
# Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
# Output: [2,2,2,1,4,3,3,9,6,7,19]

# Example 2: =>
# Input: arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]
# Output: [22,28,8,6,17,44]


# Constraints: =>
# 1 <= arr1.length, arr2.length <= 1000
# 0 <= arr1[i], arr2[i] <= 1000
# All the elements of arr2 are distinct.
# Each arr2[i] is in arr1.


class Solution:
    def relativeSortArray(self, arr1: list[int], arr2: list[int]) -> list[int]:
        max_val = max(arr1)
        freq = [0] * (max_val + 1)

        for num in arr1:
            freq[num] += 1

        res = []

        for order_number in arr2:
            while freq[order_number] > 0:
                res.append(order_number)
                freq[order_number] -= 1

        for i in range(len(freq)):
            if freq[i] > 0:
                while freq[i] > 0:
                    res.append(i)
                    freq[i] -= 1

        return res
