/**
    * desc: Given a string s, return the longest palindromic substring in s.
     
    Example 1: =>
    Input: s = "babad"
    Output: "bab"
    Explanation: "aba" is also a valid answer.

    Example 2: =>
    Input: s = "cbbd"
    Output: "bb"
    

    Constraints: =>
    1 <= s.length <= 1000
    s consist of only digits and English letters.
 */

/**
 *
 * @param s string
 * @returns string
 */
const longestPalindrome = (s: string): string => {
	let maxString: string = '';

	// return the string if it is a single character
	if (s.length < 2) return s;

	// continue expanding string if its a palindrome and return the last string value
	const palindromeHelper = (left: number, right: number, s: string): string => {
		let currentString: string = '';

		while (left >= 0 && right < s.length && s[left] === s[right]) {
			currentString = s.substring(left, right + 1);

			left -= 1;
			right += 1;
		}

		return currentString;
	};

	// loop through each character in the given string and find out the longest palindrome combination
	// check if longest combibation is greater than the current max string and update the max string
	for (let i = 0; i < s.length; i++) {
		const left: string = palindromeHelper(i, i, s);
		const right: string = palindromeHelper(i, i + 1, s);
		const currentMax = left.length > right.length ? left : right;

		maxString = maxString.length > currentMax.length ? maxString : currentMax;
	}

	return maxString;
};
