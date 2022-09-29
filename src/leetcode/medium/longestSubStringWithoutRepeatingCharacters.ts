/**
    * desc: Given a string s, find the length of the longest substring without repeating characters.

    Example 1: =>
    Input: s = "abcabcbb"
    Output: 3
    Explanation: The answer is "abc", with the length of 3.
    
    Example 2: =>
    Input: s = "bbbbb"
    Output: 1
    Explanation: The answer is "b", with the length of 1.
    
    Example 3: =>
    Input: s = "pwwkew"
    Output: 3
    Explanation: The answer is "wke", with the length of 3.
    Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
    
    Constraints: =>
    0 <= s.length <= 5 * 104
    s consists of English letters, digits, symbols and spaces.
 */

/**
 *
 * @param s string
 * @returns number
 */
const lengthOfLongestSubstring = (s: string): number => {
	let length: number = 0;
	let map: Map<string, number> = new Map();
	let end: number = 0;

	for (let i = 0; i < s.length; i++) {
		let l: number | undefined = map.get(s[i]);

		if (l !== undefined) {
			end = Math.max(end, l);
		}

		map.set(s[i], i + 1);

		length = Math.max(length, i - end + 1);
	}

	return length;
};
