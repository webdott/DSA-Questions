/**
    * desc: Given two integer arrays nums1 and nums2, return the maximum length of a subarray that appears in both arrays.

    Example 1: =>
    Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
    Output: 3
    Explanation: The repeated subarray with maximum length is [3,2,1].
    
    Example 2: =>
    Input: nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
    Output: 5
    
    Constraints: =>
    1 <= nums1.length, nums2.length <= 1000
    0 <= nums1[i], nums2[i] <= 100
 */

/**
 *
 * @param nums1 number[]
 * @param nums2 number[]
 * @returns number
 */
const findLength = (nums1: number[], nums2: number[]): number => {
	let length: number = 0;

	const lesserArray = nums1.length > nums2.length ? nums1 : nums2;
	const greaterArray = lesserArray === nums1 ? nums2 : nums1;

	let dp: number[] = Array(greaterArray.length).fill(0);
	let dp2: number[] = Array(greaterArray.length).fill(0);

	for (let i = 1; i <= lesserArray.length; i++) {
		for (let j = greaterArray.length; j > 0; j--) {
			if (lesserArray[i - 1] === greaterArray[j - 1]) {
				dp[j] = dp2[j - 1] + 1;
			} else {
				dp[j] = 0;
			}

			length = Math.max(length, dp[j]);
		}

		dp2 = dp;
	}

	return length;
};
