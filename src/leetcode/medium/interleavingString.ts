/**
    * desc: Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

    An interleaving of two strings s and t is a configuration where s and t are divided into n and m 
    substrings
    respectively, such that:

    s = s1 + s2 + ... + sn
    t = t1 + t2 + ... + tm
    |n - m| <= 1
    The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
    Note: a + b is the concatenation of strings a and b.

    Example 1: =>
    Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
    Output: true
    Explanation: One way to obtain s3 is:
    Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
    Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
    Since s3 can be obtained by interleaving s1 and s2, we return true.
    
    Example 2: =>
    Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
    Output: false
    Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
    
    Example 3: =>
    Input: s1 = "", s2 = "", s3 = ""
    Output: true
    
    Constraints: =>
    0 <= s1.length, s2.length <= 100
    0 <= s3.length <= 200
    s1, s2, and s3 consist of lowercase English letters.

    Follow up: Could you solve it using only O(s2.length) additional memory space?
 */

/**
 *
 * @param s1 number
 * @param s2 number
 * @param s3 number
 * @returns number
 */
const isInterleave = (s1: string, s2: string, s3: string): boolean => {
	if (s1.length + s2.length < s3.length) return false;

	const memo: Record<string, boolean> = {};

	/**
	 *
	 * @param str1Idx number
	 * @param str2Idx number
	 * @param str3Idx number
	 * @returns boolean
	 */
	const dp = (str1Idx: number, str2Idx: number, str3Idx: number): boolean => {
		if (str3Idx === s3.length) {
			if (str1Idx === s1.length && str2Idx === s2.length) return true;

			return false;
		}
		if (s1[str1Idx] !== s3[str3Idx] && s2[str2Idx] !== s3[str3Idx])
			return false;

		const key: string = `${str1Idx}-${str2Idx}-${str3Idx}`;
		if (memo[key] !== undefined) return memo[key];

		let i: number = str1Idx;
		let j: number = str2Idx;
		let k: number = str3Idx;

		let interleaving: boolean = false;

		if (s1[str1Idx] === s3[str3Idx]) {
			while (
				s1[str1Idx] === s3[str3Idx] &&
				str1Idx < s1.length &&
				str3Idx < s3.length
			) {
				str1Idx += 1;
				str3Idx += 1;
				interleaving ||= dp(str1Idx, str2Idx, str3Idx);
			}

			interleaving ||= dp(str1Idx, str2Idx, str3Idx);
		}

		str1Idx = i;
		str2Idx = j;
		str3Idx = k;

		if (s2[str2Idx] === s3[str3Idx]) {
			while (
				s2[str2Idx] === s3[str3Idx] &&
				str2Idx < s2.length &&
				str3Idx < s3.length
			) {
				str2Idx += 1;
				str3Idx += 1;
				interleaving ||= dp(str1Idx, str2Idx, str3Idx);
			}

			interleaving ||= dp(str1Idx, str2Idx, str3Idx);
		}

		return (memo[key] = interleaving);
	};

	return dp(0, 0, 0);
};
