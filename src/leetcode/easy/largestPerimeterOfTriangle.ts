/**
    * desc: Given an integer array nums, return the largest perimeter of a triangle with a non-zero area, formed from three of these lengths. If it is impossible to form any triangle of a non-zero area, return 0.

    Example 1: =>
    Input: nums = [2,1,2]
    Output: 5
    
    Example 2: =>
    Input: nums = [1,2,1]
    Output: 0

    Constraints: =>
    3 <= nums.length <= 104
    1 <= nums[i] <= 106
 */

/**
 *
 * @param nums number[]
 * @returns number
 */
const largestPerimeter = (nums: number[]): number => {
	nums.sort((a, b) => a - b);

	let count: number = 0;

	for (let i = 0; i < nums.length - 2; i++) {
		let a: number = nums[i];
		let b: number = nums[i + 1];
		let c: number = nums[i + 2];
		let isNonZeroArea = a < b + c && b < a + c && c < a + b;

		if (isNonZeroArea) {
			count = Math.max(count, nums[i] + nums[i + 1] + nums[i + 2]);
		}
	}

	return count;
};
