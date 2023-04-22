/**
    * desc: Given a string s. In one step you can insert any character at any index of the string.

    Return the minimum number of steps to make s palindrome.

    A Palindrome String is one that reads the same backward as well as forward.

    Example 1: =>
    Input: s = "zzazz"
    Output: 0
    Explanation: The string "zzazz" is already palindrome we do not need any insertions.
    
    Example 2: =>
    Input: s = "mbadm"
    Output: 2
    Explanation: String can be "mbdadbm" or "mdbabdm".
    
    Example 3: =>
    Input: s = "leetcode"
    Output: 5
    Explanation: Inserting 5 characters the string becomes "leetcodocteel".

    Constraints: =>
    1 <= s.length <= 500
    s consists of lowercase English letters.
 */

/**
 *
 * @param s string
 * @returns number
 */
const minInsertions = (s: string): number => {
	let DP: Record<string, number> = {};

	const dp = (left: number, right: number): number => {
		if (left > right) return 0;

		const key = `${left}-${right}`;

		if (DP[key] !== undefined) return DP[key];

		if (s[left] === s[right]) {
			return (DP[key] = dp(left + 1, right - 1));
		} else {
			return (DP[key] = 1 + Math.min(dp(left + 1, right), dp(left, right - 1)));
		}
	};

	return dp(0, s.length - 1);
};
