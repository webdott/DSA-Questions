/**
    * desc: Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

    Example 1: =>
    Input: s = "abab"
    Output: true
    Explanation: It is the substring "ab" twice.
    
    Example 2: =>
    Input: s = "aba"
    Output: false
    
    Example 3: =>
    Input: s = "abcabcabcabc"
    Output: true
    Explanation: It is the substring "abc" four times or the substring "abcabc" twice.
    
    Constraints: =>
    1 <= s.length <= 104
    s consists of lowercase English letters.
 */

/**
 *
 * @param s string
 * @returns boolean
 */
const repeatedSubstringPattern = (s: string): boolean => {
	for (let i = 1; i <= s.length / 2; i++) {
		if (s.length % i === 0) {
			let substring: string = s.substring(0, i);
			let startIdx: number = i;

			while (s.substring(startIdx, startIdx + i) === substring) {
				startIdx += i;
			}

			if (startIdx >= s.length) return true;
		}
	}

	return false;
};
