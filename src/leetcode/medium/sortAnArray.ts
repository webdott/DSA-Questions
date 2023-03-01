/**
    * desc: Given an array of integers nums, sort the array in ascending order and return it.

    You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

    Example 1: =>
    Input: nums = [5,2,3,1]
    Output: [1,2,3,5]
    Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).
    
    Example 2: =>
    Input: nums = [5,1,1,2,0,0]
    Output: [0,0,1,1,2,5]
    Explanation: Note that the values of nums are not necessairly unique.

    Constraints: =>
    1 <= nums.length <= 5 * 104
    -5 * 104 <= nums[i] <= 5 * 104
 */

/**
 * Merge Sort
 * @param nums number[]
 * @returns number[]
 */
const mergeSortArray = (nums: number[]): number[] => {
	const sortRecur = (newNums: number[]): number[] => {
		if (newNums.length === 1) return newNums;

		const newArray: number[] = [];
		let sortedLeft: number[] = [];
		let sortedRight: number[] = [];

		let mid: number = ~~(newNums.length / 2);

		if (newNums.length % 2 === 0) {
			sortedLeft = sortRecur(newNums.slice(0, mid));
			sortedRight = sortRecur(newNums.slice(mid));
		} else {
			sortedLeft = sortRecur(newNums.slice(0, mid + 1));
			sortedRight = sortRecur(newNums.slice(mid + 1));
		}

		let left: number = 0;
		let right: number = 0;

		while (left < sortedLeft.length || right < sortedRight.length) {
			if ((sortedLeft[left] ?? Infinity) <= (sortedRight[right] ?? Infinity)) {
				newArray.push(sortedLeft[left]);
				left += 1;
			} else {
				newArray.push(sortedRight[right]);
				right += 1;
			}
		}

		return newArray;
	};

	return sortRecur(nums);
};
