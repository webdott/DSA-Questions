/*
    desc: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

    You may assume that each input would have exactly one solution, and you may not use the same element twice.

    You can return the answer in any order.

    Example 1: =>
    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
    
    Example 2: =>
    Input: nums = [3,2,4], target = 6
    Output: [1,2]
    
    Example 3: =>
    Input: nums = [3,3], target = 6
    Output: [0,1]
    

    Constraints: =>
    2 <= nums.length <= 104
    -109 <= nums[i] <= 109
    -109 <= target <= 109
    Only one valid answer exists.
*/

const twoSum = (nums: number[], target: number): number[] => {
	const hashTable = new Map();
	const result = [];

	for (let i = 0; i < nums.length; i++) {
		if (hashTable.has(nums[i])) {
			hashTable.set(nums[i], [...hashTable.get(nums[i]), i]);
		} else {
			hashTable.set(nums[i], [i]);
		}
	}

	for (let key of hashTable.keys()) {
		if (hashTable.has(target - key)) {
			if (target - key === key && hashTable.get(key).length > 1) {
				result.push(hashTable.get(key)[0], hashTable.get(key)[1]);
				return result;
			} else if (hashTable.has(target - key) && target - key !== key) {
				result.push(hashTable.get(key)[0], hashTable.get(target - key)[0]);
				return result;
			}
		}
	}

	return result;
};
