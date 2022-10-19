/**
    * desc: Given an integer array nums, return the length of the longest strictly increasing subsequence.

    A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].

    Example 1: =>
    Input: nums = [10,9,2,5,3,7,101,18]
    Output: 4
    Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
    
    Example 2: =>
    Input: nums = [0,1,0,3,2,3]
    Output: 4
    
    Example 3: =>
    Input: nums = [7,7,7,7,7,7,7]
    Output: 1
    
    Constraints: =>
    1 <= nums.length <= 2500
    -104 <= nums[i] <= 104
    
    Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
 */
/**
 *
 * @param nums number[]
 * @returns number
 */
const lengthOfLIS = (nums: number[]): number => {
	const dp: number[] = [];

	for (let num of nums) {
		if (dp.length === 0 || dp.at(-1)! < num) {
			// if the num is greater than what's at the end of the array, just push
			dp.push(num);
		} else {
			// find the index that contains the closest number >= the num to insert
			let indexToReplace = findClosestBound(num, dp);
			// replace the number at that index with the curr Num
			dp[indexToReplace] = num;
		}
	}

	return dp.length;
};

/**
 *
 * @param num number
 * @param dp number[]
 * @returns
 */
const findClosestBound = (num: number, dp: number[]): number => {
	let start: number = 0;
	let end: number = dp.length - 1;
	let mid: number = 0;

	while (start <= end) {
		mid = ~~((start + end) / 2);

		if (start === end) return mid;

		if (dp[mid] === num) {
			return mid;
		} else if (dp[mid] < num) {
			start = mid + 1;
		} else {
			if (dp[mid - 1] < num) return mid;
			end = mid - 1;
		}
	}

	return mid;
};
