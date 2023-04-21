/**
    * desc: There is a group of n members, and a list of various crimes they could commit. The ith crime generates a profit[i] and requires group[i] members to participate in it. If a member participates in one crime, that member can't participate in another crime.

    Let's call a profitable scheme any subset of these crimes that generates at least minProfit profit, and the total number of members participating in that subset of crimes is at most n.

    Return the number of schemes that can be chosen. Since the answer may be very large, return it modulo 109 + 7.

    Example 1: =>
    Input: n = 5, minProfit = 3, group = [2,2], profit = [2,3]
    Output: 2
    Explanation: To make a profit of at least 3, the group could either commit crimes 0 and 1, or just crime 1.
    In total, there are 2 schemes.
    
    Example 2: =>
    Input: n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8]
    Output: 7
    Explanation: To make a profit of at least 5, the group could commit any crimes, as long as they commit one.
    There are 7 possible schemes: (0), (1), (2), (0,1), (0,2), (1,2), and (0,1,2).
    
    Constraints: =>
    1 <= n <= 100
    0 <= minProfit <= 100
    1 <= group.length <= 100
    1 <= group[i] <= 100
    profit.length == group.length
    0 <= profit[i] <= 100
 */

/**
 *
 * @param n number
 * @param minProfit number
 * @param group number[]
 * @param profit number[]
 * @returns number
 */
const profitableSchemes = (
	n: number,
	minProfit: number,
	group: number[],
	profit: number[]
): number => {
	const MODULO: number = 10 ** 9 + 7;
	const visited: number[][][] = new Array(n + 1)
		.fill(0)
		.map((_) => new Array(minProfit + 1).fill(0).map((_) => []));

	const dp = (
		currIndex: number,
		membersLeft: number,
		profitLeft: number
	): number => {
		if (currIndex === group.length || membersLeft <= 0) return 0;

		let profitIndex = profitLeft <= 0 ? 0 : profitLeft;

		if (visited[membersLeft]?.[profitIndex]?.[currIndex] !== undefined)
			return visited[membersLeft]?.[profitIndex]?.[currIndex];

		let noOfSchemes: number = 0;

		if (
			profitLeft - profit[currIndex] <= 0 &&
			membersLeft - group[currIndex] >= 0
		) {
			noOfSchemes += 1;
		}

		// take
		noOfSchemes += dp(
			currIndex + 1,
			membersLeft - group[currIndex],
			profitLeft - profit[currIndex]
		);

		// don't take
		noOfSchemes += dp(currIndex + 1, membersLeft, profitLeft);

		return (visited[membersLeft][profitIndex][currIndex] =
			noOfSchemes % MODULO);
	};

	return (dp(0, n, minProfit) + (minProfit === 0 ? 1 : 0)) % MODULO;
};
