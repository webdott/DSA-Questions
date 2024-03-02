# Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

# Example 1: =>
# Input: nums = [-4,-1,0,3,10]
# Output: [0,1,9,16,100]
# Explanation: After squaring, the array becomes [16,1,0,9,100].
# After sorting, it becomes [0,1,9,16,100].

# Example 2: =>
# Input: nums = [-7,-3,2,3,11]
# Output: [4,9,9,49,121]

# Constraints: =>
# 1 <= nums.length <= 104
# -104 <= nums[i] <= 104
# nums is sorted in non-decreasing order.

# Follow up: Squaring each element and sorting the new array is very trivial, could you find an O(n) solution using a different approach?


class SolutionSort:
    def sortedSquares(self, nums: list[int]) -> list[int]:
        return sorted([num**2 for num in nums])


class SolutionN:
    def sortedSquares(self, nums: list[int]) -> list[int]:
        negs = []
        res = []

        for num in nums:
            if num < 0:
                negs.append(num**2)
            else:
                num_sq = num**2

                while negs and negs[-1] <= num_sq:
                    res.append(negs.pop())
                res.append(num_sq)

        while negs:
            res.append(negs.pop())

        return res
