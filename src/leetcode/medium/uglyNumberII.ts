/**
    * desc: An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

    Given an integer n, return the nth ugly number.

    Example 1: =>
    Input: n = 10
    Output: 12
    Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.
    
    Example 2: =>
    Input: n = 1
    Output: 1
    Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
    
    Constraints: =>
    1 <= n <= 1690
 */
/**
 *
 * @param n number
 * @returns number
 */
const nthUglyNumber = (n: number): number => {
	const dp: number[] = Array(n).fill(0);
	dp[0] = 1;

	let i2: number = 0,
		i3: number = 0,
		i5: number = 0;

	for (let i = 1; i < n; i++) {
		let next2 = dp[i2] * 2;
		let next3 = dp[i3] * 3;
		let next5 = dp[i5] * 5;

		let min = Math.min(next2, next3, next5);

		if (min === next2) i2 += 1;
		if (min === next3) i3 += 1;
		if (min === next5) i5 += 1;

		dp[i] = min;
	}

	return dp[n - 1];
};
