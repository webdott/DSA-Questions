/**
    * desc: Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.

    Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

    Example 1: =>
    Input: s = "abciiidef", k = 3
    Output: 3
    Explanation: The substring "iii" contains 3 vowel letters.
    
    Example 2: =>
    Input: s = "aeiou", k = 2
    Output: 2
    Explanation: Any substring of length 2 contains 2 vowels.
    
    Example 3: =>
    Input: s = "leetcode", k = 3
    Output: 2
    Explanation: "lee", "eet" and "ode" contain 2 vowels.

    Constraints: =>
    1 <= s.length <= 105
    s consists of lowercase English letters.
    1 <= k <= s.length
 */

/**
 *
 * @param s string
 * @param k number
 * @returns number
 */
const maxVowels = (s: string, k: number): number => {
	let vowels: Set<string> = new Set(['a', 'e', 'i', 'o', 'u']);
	let left: number = 0;
	let right: number = 0;
	let currNo: number = 0;
	let maxNo: number = 0;

	while (right < s.length) {
		if (vowels.has(s[right])) currNo += 1;

		if (right - left === k - 1) {
			maxNo = Math.max(maxNo, currNo);
			if (vowels.has(s[left])) currNo -= 1;
			left += 1;
		}

		right += 1;
	}

	return maxNo;
};
