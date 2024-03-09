# Given two integer arrays nums1 and nums2, sorted in non-decreasing order, return the minimum integer common to both arrays. If there is no common integer amongst nums1 and nums2, return -1.

# Note that an integer is said to be common to nums1 and nums2 if both arrays have at least one occurrence of that integer.

# Example 1: =>
# Input: nums1 = [1,2,3], nums2 = [2,4]
# Output: 2
# Explanation: The smallest element common to both arrays is 2, so we return 2.

# Example 2: =>
# Input: nums1 = [1,2,3,6], nums2 = [2,3,4,5]
# Output: 2
# Explanation: There are two common elements in the array 2 and 3 out of which 2 is the smallest, so 2 is returned.

# Constraints: =>
# 1 <= nums1.length, nums2.length <= 105
# 1 <= nums1[i], nums2[j] <= 109
# Both nums1 and nums2 are sorted in non-decreasing order.


class Solution:
    def getCommon(self, nums1: list[int], nums2: list[int]) -> int:
        left, right = 0, 0

        while left < len(nums1) and right < len(nums2):
            if nums1[left] == nums2[right]:
                return nums1[left]
            elif nums1[left] < nums2[right]:
                left += 1
            else:
                right += 1

        return -1
