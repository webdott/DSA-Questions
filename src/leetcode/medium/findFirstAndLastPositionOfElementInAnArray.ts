/**
    * desc: Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

    If target is not found in the array, return [-1, -1].

    You must write an algorithm with O(log n) runtime complexity.


    Example 1: =>
    Input: nums = [5,7,7,8,8,10], target = 8
    Output: [3,4]
    
    Example 2: =>
    Input: nums = [5,7,7,8,8,10], target = 6
    Output: [-1,-1]
    
    Example 3: =>
    Input: nums = [], target = 0
    Output: [-1,-1]
    
    Constraints: =>
    0 <= nums.length <= 105
    -109 <= nums[i] <= 109
    nums is a non-decreasing array.
    -109 <= target <= 109
 */

/**
 *
 * @param nums number[]
 * @param target number
 * @returns number[]
 */
const searchRange = (nums: number[], target: number): number[] => {
	let left: number = 0;
	let right: number = nums.length - 1;

	const result: number[] = new Array(2).fill(-1);

	while (left <= right) {
		let mid: number = left + ~~((right - left) / 2);

		if (nums[mid] === target) {
			let l: number = mid;
			let r: number = mid;
			result[0] = l;
			result[1] = r;

			while (nums[l] === target || nums[r] === target) {
				l -= 1;
				r += 1;

				if (nums[l] === target) result[0] = l;
				if (nums[r] === target) result[1] = r;
			}

			return result;
		} else if (nums[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return result;
};
