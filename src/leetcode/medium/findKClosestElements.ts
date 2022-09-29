/**
    * desc: Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

    An integer a is closer to x than an integer b if:

    |a - x| < |b - x|, or
    |a - x| == |b - x| and a < b 

    Example 1: =>
    Input: arr = [1,2,3,4,5], k = 4, x = 3
    Output: [1,2,3,4]
    
    Example 2: =>
    Input: arr = [1,2,3,4,5], k = 4, x = -1
    Output: [1,2,3,4]
    
    Constraints: =>
    1 <= k <= arr.length
    1 <= arr.length <= 104
    arr is sorted in ascending order.
    -104 <= arr[i], x <= 104
 */

/**
 *
 * @param arr number[]
 * @param k number
 * @param x number
 * @returns number[]
 */
const findClosestElements = (arr: number[], k: number, x: number): number[] => {
	let result: number[] = [arr[0]];

	for (let i = 1; i < arr.length; i++) {
		let currDiff: number = Math.abs(arr[i] - x);
		let diffToCheck: number = Math.abs(result[0] - x);

		if (result.length < k) {
			result.push(arr[i]);
		} else if (
			currDiff < diffToCheck ||
			(currDiff === diffToCheck && arr[i] < result[0])
		) {
			result.shift();
			result.push(arr[i]);
		}
	}

	return result;
};
