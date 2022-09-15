/**
    * desc: Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

    Example 1: =>
    Input: nums1 = [1,2,2,1], nums2 = [2,2]
    Output: [2]
    
    Example 2: =>
    Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    Output: [9,4]
    Explanation: [4,9] is also accepted.
    
    Constraints: =>
    1 <= nums1.length, nums2.length <= 1000
    0 <= nums1[i], nums2[i] <= 1000
 */

/**
 *
 * @param nums1 number[]
 * @param nums2 number[]
 * @returns number[]
 */
const intersection = (nums1: number[], nums2: number[]): number[] => {
	if (!nums1.length || !nums2.length) return [];

	const arrToCheck: number[] = nums1.length > nums2.length ? nums1 : nums2;
	const smallerArr: number[] = nums1.length > nums2.length ? nums2 : nums1;
	const hashTable: Set<number> = new Set();
	const hashTableSmall: Set<number> = new Set();
	const result: number[] = [];

	for (let num of arrToCheck) {
		hashTable.add(num);
	}

	for (let num of smallerArr) {
		if (hashTable.has(num) && !hashTableSmall.has(num)) {
			result.push(num);
			hashTableSmall.add(num);
		}
	}

	return result;
};
