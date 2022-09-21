/**
    * desc: You are given an integer array nums and an array queries where queries[i] = [vali, indexi].

    For each query i, first, apply nums[indexi] = nums[indexi] + vali, then print the sum of the even values of nums.

    Return an integer array answer where answer[i] is the answer to the ith query.

    Example 1: =>
    Input: nums = [1,2,3,4], queries = [[1,0],[-3,1],[-4,0],[2,3]]
    Output: [8,6,2,4]
    Explanation: At the beginning, the array is [1,2,3,4].
    After adding 1 to nums[0], the array is [2,2,3,4], and the sum of even values is 2 + 2 + 4 = 8.
    After adding -3 to nums[1], the array is [2,-1,3,4], and the sum of even values is 2 + 4 = 6.
    After adding -4 to nums[0], the array is [-2,-1,3,4], and the sum of even values is -2 + 4 = 2.
    After adding 2 to nums[3], the array is [-2,-1,3,6], and the sum of even values is -2 + 6 = 4.
    
    Example 2:
    Input: nums = [1], queries = [[4,0]]
    Output: [0]
    
    Constraints: =>
    1 <= nums.length <= 104
    -104 <= nums[i] <= 104
    1 <= queries.length <= 104
    -104 <= vali <= 104
    0 <= indexi < nums.length
 */

/**
 *
 * @param nums number[]
 * @param queries number[][]
 * @returns number[]
 */
const sumEvenAfterQueries = (nums: number[], queries: number[][]): number[] => {
	const calculateEvenSum = () => {
		return nums.reduce((prevValue, currValue) => {
			return currValue % 2 === 0 ? prevValue + currValue : prevValue + 0;
		}, 0);
	};

	// calculate sum of even numbers in the initial array
	let evenSum: number = calculateEvenSum();

	const resultArray: number[] = [];

	for (let query of queries) {
		// get current number occupying the index
		let defaultNum: number = nums[query[1]];

		// set number in index to the query[i];
		nums[query[1]] = defaultNum + query[0];

		// => We check for three possibilities:
		// if the previous number was even and new number odd, subtract the previous number from evenSum
		// if previous number was odd and current number even, add current number to evenSum
		// if both previous and current numbers are even, add thier difference to evenSum

		if (nums[query[1]] % 2 === 0) {
			if (defaultNum % 2 === 0) {
				evenSum += nums[query[1]] - defaultNum;
			} else {
				evenSum += nums[query[1]];
			}
		} else if (defaultNum % 2 === 0) {
			evenSum -= defaultNum;
		}

		// push evenSum to result array
		resultArray.push(evenSum);
	}

	return resultArray;
};
