/**
    * desc: Given an integer n, return the least number of perfect square numbers that sum to n.

    A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

    Example 1: =>
    Input: n = 12
    Output: 3
    Explanation: 12 = 4 + 4 + 4.
    
    Example 2: =>
    Input: n = 13
    Output: 2
    Explanation: 13 = 4 + 9.

    Constraints: =>
    1 <= n <= 104
 */

/**
 *
 * @param n number
 * @returns number
 */
const numSquares = (n: number): number => {
	let sqrtA: number = Math.sqrt(n);
	if (sqrtA === ~~sqrtA) return 1;

	const squares: number[] = [];

	for (let i = 1; i < n; i++) {
		if (i ** 2 > n) break;
		squares.push(i ** 2);
	}

	const queue: number[][] = squares.map((val) => [n - val, 1]);
	const seen: Set<string> = new Set();

	while (queue.length > 0) {
		let queueLength: number = queue.length;
		let min: number = Infinity;

		for (let i = 0; i < queueLength; i++) {
			let numPair: number[] = queue.shift()!;

			for (let square of squares) {
				if (numPair[0] - square === 0) {
					min = Math.min(min, numPair[1] + 1);
				} else if (numPair[0] - square > 0) {
					let p1 = `${numPair[0] - square}`;

					if (!seen.has(p1)) {
						queue.push([numPair[0] - square, numPair[1] + 1]);
						seen.add(p1);
					}
				}
			}
		}

		if (min !== Infinity) return min;
	}

	return -1;
};

/**
 *
 * @param n number
 * @returns number
 */
const numSquaresDP = (n: number): number => {
	const dp: number[] = new Array(n + 1).fill(Infinity);
	dp[0] = 0;
	dp[1] = 1;

	for (let i = 2; i <= n; i++) {
		for (let j = 1; j * j <= i; j++) {
			dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
		}
	}

	return dp[n];
};
