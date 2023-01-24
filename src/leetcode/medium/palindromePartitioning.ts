/**
    * desc: Given a string s, partition s such that every 
    substring
    of the partition is a 
    palindrome
    . Return all possible palindrome partitioning of s.

    Example 1: =>
    Input: s = "aab"
    Output: [["a","a","b"],["aa","b"]]
    
    Example 2: =>
    Input: s = "a"
    Output: [["a"]]
    
    Constraints: =>
    1 <= s.length <= 16
    s contains only lowercase English letters.
 */

/**
 *
 * @param s string
 * @returns string[][]
 */
const partition = (s: string): string[][] => {
	const result: string[][] = [];

	const isPalindrome = (str: string): boolean => {
		if (s.length === 0) return false;
		let pointerOne: number = 0;
		let pointerTwo: number = str.length - 1;

		while (pointerOne <= pointerTwo) {
			if (str[pointerOne] !== str[pointerTwo]) {
				return false;
			}

			pointerOne += 1;
			pointerTwo -= 1;
		}

		return true;
	};

	const dfs = (currIndex: number, currIter: string[]): void => {
		if (currIndex > s.length) return;

		if (currIndex === s.length) {
			result.push(currIter.slice());
		}

		const initIndex: number = currIndex;

		for (let i = currIndex + 1; i <= s.length; i++) {
			let subStr: string = s.substring(initIndex, i);

			if (isPalindrome(subStr)) {
				currIter.push(subStr);
				dfs(i, currIter);
				currIter.pop();
			}
		}
	};

	dfs(0, []);

	return result;
};
