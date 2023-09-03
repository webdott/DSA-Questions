/**
    * desc: There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

    Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

    The test cases are generated so that the answer will be less than or equal to 2 * 109.

    Example 1: =>
    Input: m = 3, n = 7
    Output: 28
    
    Example 2: =>
    Input: m = 3, n = 2
    Output: 3
    Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
    1. Right -> Down -> Down
    2. Down -> Down -> Right
    3. Down -> Right -> Down
    
    Constraints: =>
    1 <= m, n <= 100
 */

/**
 *
 * @param m number
 * @param n number
 * @returns number
 */
const uniquePaths = (m: number, n: number): number => {
	const getNextSteps = (row: number, column: number): number[][] => {
		return [
			[row + 1, column],
			[row, column + 1],
		];
	};

	const memo: Record<string, number> = {};

	const dp = (row: number, column: number): number => {
		if (row >= m || column >= n) return 0;

		if (row === m - 1 && column === n - 1) return 1;

		const key: string = `${row}-${column}`;

		if (memo[key] !== undefined) return memo[key];

		const nextSteps = getNextSteps(row, column);

		let ans: number = 0;

		for (const step of nextSteps) {
			ans += dp(step[0], step[1]);
		}

		return (memo[key] = ans);
	};

	return dp(0, 0);
};
