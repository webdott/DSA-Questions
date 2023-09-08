/**
    * desc: Given an integer numRows, return the first numRows of Pascal's triangle.

    In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

    Example 1: =>
    Input: numRows = 5
    Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
    
    Example 2: =>
    Input: numRows = 1
    Output: [[1]]

    Constraints: =>
    1 <= numRows <= 30
 */

/**
 *
 * @param numRows number
 * @returns number[][]
 */
const generate = (numRows: number): number[][] => {
	const dp: number[][] = Array(numRows)
		.fill(0)
		.map((_, idx) => Array(idx + 1).fill(0));

	dp[0][0] = 1;

	for (let row = 1; row < numRows; row++) {
		for (let idx = 0; idx < dp[row].length; idx++) {
			dp[row][idx] = (dp[row - 1][idx] ?? 0) + (dp[row - 1][idx - 1] ?? 0);
		}
	}

	return dp;
};
