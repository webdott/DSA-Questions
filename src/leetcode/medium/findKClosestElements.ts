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

/**
 *
 * @param arr number[]
 * @param k number
 * @param x number
 * @returns number[]
 */
const findClosestElementsBinarySearch = (
	arr: number[],
	k: number,
	x: number
): number[] => {
	let closest: number = Infinity;
	let closestMid: number = -1;

	let p1: number = 0;
	let p2: number = arr.length - 1;

	// use binary search to find closest element to x
	while (p1 <= p2) {
		let mid: number = p1 + ~~((p2 - p1) / 2);
		let currDiff: number = Math.abs(arr[mid] - x);

		if (currDiff < closest || (currDiff === closest && mid < closestMid)) {
			closest = currDiff;
			closestMid = mid;
		}

		if (arr[mid] === x) break;

		if (arr[mid] > x) {
			p2 = mid - 1;
		} else {
			p1 = mid + 1;
		}
	}

	// initialize two pointers and at closest element to x and keep moving left or right depending on what is closer to x until we have k elements
    
	p1 = closestMid;
	p2 = closestMid;
	let count: number = 1;

	while (count < k) {
		let left: number = p1 - 1 >= 0 ? Math.abs(arr[p1 - 1] - x) : Infinity;
		let right: number =
			p2 + 1 < arr.length ? Math.abs(arr[p2 + 1] - x) : Infinity;

		if (left <= right) {
			p1 -= 1;
		} else {
			p2 += 1;
		}

		count += 1;
	}

	return arr.slice(p1, p2 + 1);
};
