/**
 * desc: Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

 

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
Example 2:

Input: nums = [0,0,0], target = 1
Output: 0
Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
 

Constraints:

3 <= nums.length <= 1000
-1000 <= nums[i] <= 1000
-104 <= target <= 104
 */

/**
 *
 * @param nums number[]
 * @param target number
 * @returns number
 */
const threeSumClosest = (nums: number[], target: number): number => {
	nums.sort((a, b) => a - b);
	let sum: number = Infinity;

	for (let i = 0; i < nums.length - 2; i++) {
		let p1: number = i + 1;
		let p2: number = nums.length - 1;

		while (p1 < p2) {
			let currSum: number = nums[i] + nums[p1] + nums[p2];

			if (currSum === target) return currSum;

			if (Math.abs(target - currSum) < Math.abs(target - sum)) sum = currSum;

			if (currSum < target) {
				p1 += 1;
			} else {
				p2 -= 1;
			}
		}
	}

	return sum;
};

// [4,0,5,-5,3,3,0,-4,-5] -2 [-5, -5, -4, 0, 0, 3, 3, 4, 5]
