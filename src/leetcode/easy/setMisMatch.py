# * desc: You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.

# You are given an integer array nums representing the data status of this set after the error.

# Find the number that occurs twice and the number that is missing and return them in the form of an array.

# Example 1: =>
# Input: nums = [1,2,2,4]
# Output: [2,3]

# Example 2: =>
# Input: nums = [1,1]
# Output: [1,2]

# Constraints: =>
# 2 <= nums.length <= 104
# 1 <= nums[i] <= 104

# time -> O(n logn)
# space -> O(1)
class Solution:
    def findErrorNums(self, nums: list[int]) -> list[int]:
        nums.sort()

        num_missing = 0
        dup = 0

        for i in range(len(nums)):
            # if i see the missing index, reset index
            if num_missing == nums[i]:
                num_missing = 0

            # if i see a number that is not equivalent to the index + 1, that might be a missing index
            if nums[i] != i + 1 and num_missing == 0:
                num_missing = i + 1

            # find duplicate when index equal to the next
            if i < len(nums) - 1 and nums[i] == nums[i + 1]:
                dup = nums[i]

        return [dup, num_missing]


# time -> O(n)
# space -> O(n)
class Solution2:
    def findErrorNums(self, nums: list[int]) -> list[int]:
        dup_set = set()
        all_idx = set(i + 1 for i in range(len(nums)))

        dup = -1

        for i in range(len(nums)):
            if nums[i] in all_idx:
                all_idx.remove(nums[i])

            if nums[i] in dup_set:
                dup = nums[i]
            else:
                dup_set.add(nums[i])

        return [dup, list(all_idx)[0]]
