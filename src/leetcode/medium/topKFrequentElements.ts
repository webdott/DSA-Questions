/**
    * desc: Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

    Example 1: =>
    Input: nums = [1,1,1,2,2,3], k = 2
    Output: [1,2]
    
    Example 2: =>
    Input: nums = [1], k = 1
    Output: [1]

    Constraints: =>
    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    k is in the range [1, the number of unique elements in the array].
    It is guaranteed that the answer is unique.
    
    Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
 */

import { MaxPriorityQueue } from '@datastructures-js/priority-queue';

/**
 *
 * @param nums number[]
 * @param k number
 * @returns number[]
 */
const topKFrequent = (nums: number[], k: number): number[] => {
	const result: number[] = [];
	let hash: Record<number, number> = {};
	const queue = new MaxPriorityQueue(
		(pair: { number: number; occ: number }) => pair.occ
	);

	for (let num of nums) {
		if (!hash[num]) hash[num] = 0;
		hash[num] += 1;
	}

	for (const pair of Object.entries(hash)) {
		queue.enqueue({ number: +pair[0], occ: pair[1] });
	}

	while (k > 0) {
		result.push(queue.dequeue().number);

		k -= 1;
	}

	return result;
};
