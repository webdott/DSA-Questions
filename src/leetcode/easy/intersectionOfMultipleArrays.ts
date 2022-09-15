/**
    * desc: Given a 2D integer array nums where nums[i] is a non-empty array of distinct positive integers, return the list of integers that are present in each array of nums sorted in ascending order. 

    Example 1: =>
    Input: nums = [[3,1,2,4,5],[1,2,3,4],[3,4,5,6]]
    Output: [3,4]
    Explanation: 
    The only integers present in each of nums[0] = [3,1,2,4,5], nums[1] = [1,2,3,4], and nums[2] = [3,4,5,6] are 3 and 4, so we return [3,4].
    
    Example 2: =>
    Input: nums = [[1,2,3],[4,5,6]]
    Output: []
    Explanation: 
    There does not exist any integer present both in nums[0] and nums[1], so we return an empty list [].
    
    Constraints: =>
    1 <= nums.length <= 1000
    1 <= sum(nums[i].length) <= 1000
    1 <= nums[i][j] <= 1000
    All the values of nums[i] are unique.
 */

/**
 *
 * @param nums number[][]
 * @returns number[]
 */
const intersection = (nums: number[][]): number[] => {
	if (nums.length === 0) return [];
	nums[0].sort((a, b) => a - b);
	if (nums.length === 1) return nums[0];

	const hashTable: Set<number> = new Set();

	for (let num of nums[0]) {
		hashTable.add(num);
	}

	for (let i = 1; i < nums.length; i++) {
		if (hashTable.size === 0) return [];
		let tempHashTable: Set<number> = new Set();

		for (let num of nums[i]) {
			tempHashTable.add(num);
		}

		for (let num of hashTable.values()) {
			if (!tempHashTable.has(num)) hashTable.delete(num);
		}
	}

	return Array.from(hashTable.values());
};
