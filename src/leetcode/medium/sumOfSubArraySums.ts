/**
    * desc: Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.

    Example 1: =>
    Input: arr = [3,1,2,4]
    Output: 17
    Explanation: 
    Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
    Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
    Sum is 17.
    
    Example 2: =>
    Input: arr = [11,81,94,43,3]
    Output: 444

    Constraints: =>
    1 <= arr.length <= 3 * 104
    1 <= arr[i] <= 3 * 104
 */

const MODULUS = 10 ** 9 + 7;

/**
 *
 * @param arr number[]
 * @returns number
 */
const sumSubarrayMinsSlow = (arr: number[]): number => {
    // This is slow because of the nested loop
	let sum: number = 0;

	for (let i = 0; i < arr.length; i++) {
		let min: number = Infinity;

		for (let j = i; j < arr.length; j++) {
			min = Math.min(min, arr[i]);
            sum += min;
		}
	}

	return sum % MODULUS;
};

const sumSubarrayMinsOpt = (arr: number[]): number => {
    const stack: number[] = [-1];
    let sum: number = 0;

    arr.push(-Infinity);

    for (let i = 0; i < arr.length; i++) {
        while (arr[stack[stack.length - 1]] >= arr[i]) {
            let currIdx: number = stack.pop()!;

            sum += (arr[currIdx] * (i - currIdx) * ((currIdx) - stack[stack.length - 1]));
        }

        stack.push(i);
    }

    return sum % MODULUS;
}
