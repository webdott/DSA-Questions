/**
    * desc: Given a string s, find the longest palindromic subsequence's length in s.

    A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

    Example 1: =>
    Input: s = "bbbab"
    Output: 4
    Explanation: One possible longest palindromic subsequence is "bbbb".
    
    Example 2: =>
    Input: s = "cbbd"
    Output: 2
    Explanation: One possible longest palindromic subsequence is "bb".

    Constraints: =>
    1 <= s.length <= 1000
    s consists only of lowercase English letters.
 */

/**
 *
 * @param s string
 * @returns number
 */
const longestPalindromeSubseq = (s: string): number => {
	const DP: number[][] = Array(s.length)
		.fill(0)
		.map((_) => []);

	/**
	 *
	 * @param start number
	 * @returns number
	 * @param end number
	 */
	const checkPalindromeSubSeq = (start: number, end: number): number => {
		if (start === end) return 1;

		if (start > end) return 0;

		if (DP[start]?.[end] !== undefined) return DP[start][end];

		if (s[start] === s[end]) {
			return (DP[start][end] = 2 + checkPalindromeSubSeq(start + 1, end - 1));
		} else {
			return (DP[start][end] = Math.max(
				checkPalindromeSubSeq(start + 1, end),
				checkPalindromeSubSeq(start, end - 1)
			));
		}
	};

	return checkPalindromeSubSeq(0, s.length - 1);
};
