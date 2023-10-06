/**
    * desc: Given an integer n, break it into the sum of k positive integers, where k >= 2, and maximize the product of those integers.

    Return the maximum product you can get.

    Example 1: =>
    Input: n = 2
    Output: 1
    Explanation: 2 = 1 + 1, 1 × 1 = 1.
    
    Example 2: =>
    Input: n = 10
    Output: 36
    Explanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.
    
    Constraints: =>
    2 <= n <= 58
 */

/**
 *
 * @param n number
 * @returns number
 */
const integerBreak = (n: number): number => {
	const memo: Record<number, number> = {};

	const dp = (num: number): number => {
		if (n === 3) return 2;
		if (num <= 2) return 1;

		if (memo[num] !== undefined) return memo[num];

		let max: number = 0;

		for (let i = 2; i <= num; i++) {
			const currMax = i * dp(num - i);
			max = Math.max(max, currMax);
		}

		return (memo[num] = max);
	};

	return dp(n);
};
