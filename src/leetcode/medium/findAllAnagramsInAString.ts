/**
    * desc: Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

    An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

    Example 1: =>
    Input: s = "cbaebabacd", p = "abc"
    Output: [0,6]
    Explanation:
    The substring with start index = 0 is "cba", which is an anagram of "abc".
    The substring with start index = 6 is "bac", which is an anagram of "abc".
    
    Example 2: =>
    Input: s = "abab", p = "ab"
    Output: [0,1,2]
    Explanation:
    The substring with start index = 0 is "ab", which is an anagram of "ab".
    The substring with start index = 1 is "ba", which is an anagram of "ab".
    The substring with start index = 2 is "ab", which is an anagram of "ab".
    
    Constraints: =>
    1 <= s.length, p.length <= 3 * 104
    s and p consist of lowercase English letters.
 */

/**
 *
 * @param s string
 * @param p string
 * @returns number[]
 */
const findAnagrams = (s: string, p: string): number[] => {
	if (s.length < p.length) {
		return [];
	}

	const buildAnagram = (str: string): number[] => {
		let char: number[] = Array(26).fill(0);

		for (let st of str) {
			char[st.charCodeAt(0) - 97] += 1;
		}

		return char;
	};

	const pHash: number[] = buildAnagram(p);
	const result: number[] = [];
	let start: number = 0;
	let sHash: number[] = Array(26).fill(0);

	for (let i = 0; i < s.length; i++) {
		let char: string = s[i];

		sHash[char.charCodeAt(0) - 97] += 1;

		if (i - start === p.length - 1) {
			if (sHash.join('') === pHash.join('')) {
				result.push(start);
			}

			sHash[s[start].charCodeAt(0) - 97] -= 1;
			start += 1;
		}
	}

	return result;
};
