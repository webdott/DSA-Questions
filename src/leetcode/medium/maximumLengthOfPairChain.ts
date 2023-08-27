/**
    * desc: You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and lefti < righti.

    A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion.

    Return the length longest chain which can be formed.

    You do not need to use up all the given intervals. You can select pairs in any order.

    Example 1: =>
    Input: pairs = [[1,2],[2,3],[3,4]]
    Output: 2
    Explanation: The longest chain is [1,2] -> [3,4].
    
    Example 2: =>
    Input: pairs = [[1,2],[7,8],[4,5]]
    Output: 3
    Explanation: The longest chain is [1,2] -> [4,5] -> [7,8].

    Constraints: =>
    n == pairs.length
    1 <= n <= 1000
    -1000 <= lefti < righti <= 1000
 */

/**
 *
 * @param pairs number[][]
 * @returns number
 */
const findLongestChain = (pairs: number[][]): number => {
	pairs.sort((a, b) => a[1] - b[1]);

	const memo: Record<number, number> = {};

	const dp = (prevIdx: number, idx: number): number => {
		if (idx === pairs.length) return 0;

		if (memo[idx] !== undefined) return memo[idx];

		let maxChain: number = 0;

		//choose
		if (prevIdx === -1 || pairs[idx][0] > pairs[prevIdx][1]) {
			maxChain = Math.max(maxChain, 1 + dp(idx, idx + 1));
		}

		//don't choose
		maxChain = Math.max(maxChain, dp(prevIdx, idx + 1));

		return (memo[idx] = maxChain);
	};

	return dp(-1, 0);
};
