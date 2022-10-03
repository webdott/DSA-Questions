/**
    * desc: Alice has n balloons arranged on a rope. You are given a 0-indexed string colors where colors[i] is the color of the ith balloon.

    Alice wants the rope to be colorful. She does not want two consecutive balloons to be of the same color, so she asks Bob for help. Bob can remove some balloons from the rope to make it colorful. You are given a 0-indexed integer array neededTime where neededTime[i] is the time (in seconds) that Bob needs to remove the ith balloon from the rope.

    Return the minimum time Bob needs to make the rope colorful.


    Example 1: =>
    Input: colors = "abaac", neededTime = [1,2,3,4,5]
    Output: 3
    Explanation: In the above image, 'a' is blue, 'b' is red, and 'c' is green.
    Bob can remove the blue balloon at index 2. This takes 3 seconds.
    There are no longer two consecutive balloons of the same color. Total time = 3.
    
    Example 2: =>
    Input: colors = "abc", neededTime = [1,2,3]
    Output: 0
    Explanation: The rope is already colorful. Bob does not need to remove any balloons from the rope.
    
    Example 3: =>
    Input: colors = "aabaa", neededTime = [1,2,3,4,1]
    Output: 2
    Explanation: Bob will remove the ballons at indices 0 and 4. Each ballon takes 1 second to remove.
    There are no longer two consecutive balloons of the same color. Total time = 1 + 1 = 2.
    
    Constraints: =>
    n == colors.length == neededTime.length
    1 <= n <= 105
    1 <= neededTime[i] <= 104
    colors contains only lowercase English letters.
 */

/**
 *
 * @param colors string
 * @param neededTime number[]
 * @returns number
 *
 * O(n^2logn) time | O(n) space
 */
const minCost = (colors: string, neededTime: number[]): number => {
	let currMin: string[] = [];
	let needed: number[] = [];
	let min: number = 0;

	for (let i = 0; i < colors.length; i++) {
		if (colors[i] === currMin[currMin.length - 1] || currMin.length === 0) {
			currMin.push(colors[i]);
			needed.push(neededTime[i]);
		} else {
			if (currMin.length > 1) {
				needed.sort((a, b) => a - b);

				min += needed
					.slice(0, needed.length - 1)
					.reduce((prev, curr) => prev + curr);
			}
			currMin = [];
			needed = [];
			currMin.push(colors[i]);
			needed.push(neededTime[i]);
		}
	}

	if (currMin.length > 1) {
		needed.sort((a, b) => a - b);

		min += needed
			.slice(0, needed.length - 1)
			.reduce((prev, curr) => prev + curr);
	}

	return min;
};

/**
 *
 * @param colors string
 * @param neededTime number[]
 * @returns number[]
 *
 * O(n) time | O(1) space
 */
const minCostOptimized = (colors: string, neededTime: number[]): number => {
	let min: number = 0;

	for (let i = colors.length - 1; i >= 0; i--) {
		if (colors[i] === colors[i + 1]) {
			let currMin = Math.min(neededTime[i], neededTime[i + 1]);
			min += currMin;

			if (currMin === neededTime[i]) {
				[neededTime[i], neededTime[i + 1]] = [neededTime[i + 1], neededTime[i]];
			}
		}
	}

	return min;
};
