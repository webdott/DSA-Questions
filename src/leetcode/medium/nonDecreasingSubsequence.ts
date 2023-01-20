/**
    * desc: Given an integer array nums, return all the different possible non-decreasing subsequences of the given array with at least two elements. You may return the answer in any order.

    Example 1: =>
    Input: nums = [4,6,7,7]
    Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
    
    Example 2: =>
    Input: nums = [4,4,3,2,1]
    Output: [[4,4]]
    
    Constraints: =>
    1 <= nums.length <= 15
    -100 <= nums[i] <= 100
 */

/**
 *
 * @param nums number[]
 * @returns number[][]
 */
const findSubsequences = (nums: number[]): number[][] => {
	let results: number[][] = [[]];
	const seen: Set<string> = new Set();

	for (let i = 0; i < nums.length; i++) {
		let queueLength: number = results.length;

		for (let j = 0; j < queueLength; j++) {
			let lastSub: number[] = results.pop()!;

			if (lastSub.length === 0 || lastSub[lastSub.length - 1] <= nums[i]) {
				const newArr: number[] = [...lastSub, nums[i]];
				const key: string = JSON.stringify(newArr);

				if (!seen.has(key)) {
					results.splice(0, 0, newArr);
					seen.add(key);
				}
			}

			results.splice(0, 0, lastSub);
		}
	}

	return results.filter((sub) => sub.length > 1);
};
