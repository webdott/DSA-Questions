/**
    * desc: You are climbing a staircase. It takes n steps to reach the top.

    Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

    Example 1: =>
    Input: n = 2
    Output: 2
    Explanation: There are two ways to climb to the top.
    1. 1 step + 1 step
    2. 2 steps
    
    Example 2: =>
    Input: n = 3
    Output: 3
    Explanation: There are three ways to climb to the top.
    1. 1 step + 1 step + 1 step
    2. 1 step + 2 steps
    3. 2 steps + 1 step
    
    Constraints: =>
    1 <= n <= 45
 */

/**
 *
 * @param n number
 * @returns number
 */
const climbStairs = (n: number): number => {
	// let distinctWays: number = 0;
	const memo: Map<number, number> = new Map();

	const takeStairs = (n: number): number => {
		if (memo.has(n)) return memo.get(n)!;
		if (n < 0) return 0;
		if (n === 0) {
			return 1;
		}

		let take1: number = takeStairs(n - 1);
		let take2: number = takeStairs(n - 2);

		memo.set(n, take1 + take2);
		return take1 + take2;
	};

	let distinctWays: number = takeStairs(n);

	return distinctWays;
};
