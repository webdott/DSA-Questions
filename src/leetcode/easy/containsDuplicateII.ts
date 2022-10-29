/**
    * desc: Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

    Example 1: =>
    Input: nums = [1,2,3,1], k = 3
    Output: true
    
    Example 2: =>
    Input: nums = [1,0,1,1], k = 1
    Output: true
    
    Example 3: =>
    Input: nums = [1,2,3,1,2,3], k = 2
    Output: false
    
    Constraints: =>
    1 <= nums.length <= 105
    -109 <= nums[i] <= 109
    0 <= k <= 105
 */

/**
 *
 * @param nums number[]
 * @param k number
 * @returns boolean
 */
const containsNearbyDuplicate = (nums: number[], k: number): boolean => {
	const hashMap: Map<number, number[]> = new Map();

	for (let i = 0; i < nums.length; i++) {
		if (hashMap.has(nums[i])) {
			let values: number[] = hashMap.get(nums[i])!;
			if (Math.abs(i - values.at(-1)!) <= k) {
				return true;
			} else {
				hashMap.set(nums[i], [...values, i]);
			}
		} else {
			hashMap.set(nums[i], [i]);
		}
	}

	return false;
};
