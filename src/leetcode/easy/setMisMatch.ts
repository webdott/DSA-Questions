/**
    * desc: You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.

    You are given an integer array nums representing the data status of this set after the error.

    Find the number that occurs twice and the number that is missing and return them in the form of an array.

    Example 1: =>
    Input: nums = [1,2,2,4]
    Output: [2,3]
    
    Example 2: =>
    Input: nums = [1,1]
    Output: [1,2]
    
    Constraints: =>
    2 <= nums.length <= 104
    1 <= nums[i] <= 104
 */

/**
 *
 * @param nums number[]
 * @returns number[]
 */
const findErrorNums = (nums: number[]): number[] => {
	const numArr: number[] = Array(nums.length)
		.fill(0)
		.map((_, idx) => idx + 1);
	const set: Set<number> = new Set(numArr);
	const dups: Set<number> = new Set();
	let duplicate: number = -1;

	for (let i = 0, count = 1; i < nums.length; i++, count++) {
		if (dups.has(nums[i])) {
			duplicate = nums[i];
		}

		dups.add(nums[i]);
		set.delete(nums[i]);
	}

	return [duplicate, set.values().next().value];
};
