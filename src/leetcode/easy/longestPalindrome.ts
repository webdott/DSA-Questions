/**
    * desc: Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

    Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

    Example 1: =>
    Input: s = "abccccdd"
    Output: 7
    Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
    
    Example 2: =>
    Input: s = "a"
    Output: 1
    Explanation: The longest palindrome that can be built is "a", whose length is 1.

    Constraints: =>
    1 <= s.length <= 2000
    s consists of lowercase and/or uppercase English letters only.
 */

/**
 *
 * @param s string
 * @returns number
 */
const longestPalindrome = (s: string): number => {
	const hashMap: Map<string, number> = new Map();

	for (let char of s) {
		hashMap.set(char, (hashMap.get(char) ?? 0) + 1);
	}

	let middle: number = 0;
	let result: number = 0;

	for (let word of hashMap.keys()) {
		let count = hashMap.get(word)!;

		if (count % 2 !== 0 && middle === 0) {
			middle = 1;
		}

		result += ~~(count / 2);
	}

	return result * 2 + middle;
};
