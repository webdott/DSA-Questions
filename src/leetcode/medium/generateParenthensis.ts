/**
    * desc: Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

    Example 1: =>
    Input: n = 3
    Output: ["((()))","(()())","(())()","()(())","()()()"]
    
    Example 2: =>
    Input: n = 1
    Output: ["()"]
    
    Constraints: =>
    1 <= n <= 8
 */

/**
 *
 * @param n number
 * @returns string[]
 */
const generateParenthesis = (n: number): string[] => {
	const result: string[] = [];
	const seen: Set<string> = new Set();

	const dfsHelper = (
		currStringBrac: string,
		leftNo: number,
		rightNo: number
	): void => {
		if (currStringBrac.length === n * 2) {
			if (!seen.has(currStringBrac)) {
				result.push(currStringBrac);
				seen.add(currStringBrac);
			}
			return;
		}

		if (leftNo < n) dfsHelper(currStringBrac + '(', leftNo + 1, rightNo);

		if (leftNo > rightNo) dfsHelper(currStringBrac + ')', leftNo, rightNo + 1);
	};

	dfsHelper('', 0, 0);

	return result;
};
