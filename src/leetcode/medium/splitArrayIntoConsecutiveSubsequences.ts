/*
    desc: You are given an integer array nums that is sorted in non-decreasing order.

    Determine if it is possible to split nums into one or more subsequences such that both of the following conditions are true:

    Each subsequence is a consecutive increasing sequence (i.e. each integer is exactly one more than the previous integer).
    All subsequences have a length of 3 or more.
    Return true if you can split nums according to the above conditions, or false otherwise.

    A subsequence of an array is a new array that is formed from the original array by deleting some (can be none) of the elements without disturbing the relative positions of the remaining elements. (i.e., [1,3,5] is a subsequence of [1,2,3,4,5] while [1,3,2] is not).

    
    Example 1: =>
    Input: nums = [1,2,3,3,4,5]
    Output: true
    Explanation: nums can be split into the following subsequences:
    [1,2,3,3,4,5] --> 1, 2, 3
    [1,2,3,3,4,5] --> 3, 4, 5
    
    Example 2: =>
    Input: nums = [1,2,3,3,4,4,5,5]
    Output: true
    Explanation: nums can be split into the following subsequences:
    [1,2,3,3,4,4,5,5] --> 1, 2, 3, 4, 5
    [1,2,3,3,4,4,5,5] --> 3, 4, 5
    
    Example 3: =>
    Input: nums = [1,2,3,4,4,5]
    Output: false
    Explanation: It is impossible to split nums into consecutive increasing subsequences of length 3 or more.
    

    Constraints: =>
    1 <= nums.length <= 104
    -1000 <= nums[i] <= 1000
    nums is sorted in non-decreasing order.
*/

class SubSet {
	private subSize: number;
	public biggest: number;

	//initialize Set class with a number being the largest number in the set
	constructor(start: number) {
		this.biggest = start;
		this.subSize = 1;
	}

	// if the number to be added is larger than current largest number by 1, make the new number the largest number, increase setSize by 1 and return true
	// else return false.
	addNext(num: number) {
		if (num > this.biggest && num - this.biggest == 1) {
			this.biggest = num;
			this.subSize++;
			return true;
		}
		return false;
	}

	get size() {
		return this.subSize;
	}
}

const isPossible = (nums: number[]): boolean => {
	const subsets: Array<SubSet> = [];

	for (const num of nums) {
		addToSubSets(subsets, num);
	}

	// for any set that the size is less than 3, return false. Else, return true.
	for (const set of subsets) {
		if (set.size < 3) {
			return false;
		}
	}

	return true;
};

const addToSubSets = (sets: Array<SubSet>, num: number): void => {
	// for each set in sets, sort set in terms of the size and return if a number can be added to it
	// if the number can't be added to any of the sets, create a new Set and add the number then => Add the set to the front of the Sets Array
	for (const set of sets) {
		if (set.addNext(num)) {
			sets.sort((a, b) => a.size - b.size);
			return;
		}
	}
	let newSet = new SubSet(num);
	sets.unshift(newSet);
};
