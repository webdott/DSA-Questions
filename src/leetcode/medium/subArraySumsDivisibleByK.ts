/**
    * desc: Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.

    A subarray is a contiguous part of an array.

    Example 1: =>
    Input: nums = [4,5,0,-2,-3,1], k = 5
    Output: 7
    Explanation: There are 7 subarrays with a sum divisible by k = 5:
    [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
    
    Example 2: => 
    Input: nums = [5], k = 9
    Output: 0
    
    Constraints: =>
    1 <= nums.length <= 3 * 104
    -104 <= nums[i] <= 104
    2 <= k <= 104
 */

/**
 *
 * @param nums number[]
 * @param k number
 * @returns number
 */
// Refer to https://leetcode.com/problems/subarray-sums-divisible-by-k/solutions/413234/whiteboard-explanation/?orderBy=most_votes for great explanation
const subarraysDivByK = (nums: number[], k: number): number => {
	let subSums: number = 0;
	const remainderMap: Map<number, number> = new Map();

	remainderMap.set(0, 1);

	let sum: number = 0;

	for (let i = 0; i < nums.length; i++) {
		sum += nums[i];

		let remainder: number = sum % k;

		if (remainder < 0) remainder += k;

		if (remainderMap.has(remainder)) {
			subSums += remainderMap.get(remainder)!;
			remainderMap.set(remainder, remainderMap.get(remainder)! + 1);
		} else {
			remainderMap.set(remainder, 1);
		}
	}

	return subSums;
};
