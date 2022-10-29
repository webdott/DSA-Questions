/**
    * desc: Given an integer array nums and an integer k, return true if nums has a continuous subarray of size at least two whose elements sum up to a multiple of k, or false otherwise.

    An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.

    Example 1: =>
    Input: nums = [23,2,4,6,7], k = 6
    Output: true
    Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
   
    Example 2: =>
    Input: nums = [23,2,6,4,7], k = 6
    Output: true
    Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
    42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.
    
    Example 3: =>
    Input: nums = [23,2,6,4,7], k = 13
    Output: false

    Constraints: =>
    1 <= nums.length <= 105
    0 <= nums[i] <= 109
    0 <= sum(nums[i]) <= 231 - 1
    1 <= k <= 231 - 1
 */

/**
 *
 * @param nums number[]
 * @param k number
 * @returns boolean
 */
const checkSubarraySum = (nums: number[], k: number): boolean => {
	const map: Map<number, number> = new Map();
	let prefixSum: number = 0;

	for (let i = 0; i < nums.length; i++) {
		const val: number = nums[i];
		prefixSum += val;
		const remainder = prefixSum % k;
		// prefix sum is 0 or a multiple of k
		if (remainder === 0 && i > 0) {
			return true;
		}

		if (map.has(remainder)) {
			const startIdx = map.get(remainder)! + 1;
			const subarrayLen = i - startIdx + 1;
			if (subarrayLen > 1) return true;
		} else {
			// record to HashMap only if key doesn't exist in map
			// Why? This allows us to deal with the subarrays with maximum length
			map.set(remainder, i);
		}
	}

	return false;
};
