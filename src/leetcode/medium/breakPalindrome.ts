/**
    * desc: Given a palindromic string of lowercase English letters palindrome, replace exactly one character with any lowercase English letter so that the resulting string is not a palindrome and that it is the lexicographically smallest one possible.

    Return the resulting string. If there is no way to replace a character to make it not a palindrome, return an empty string.

    A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, a has a character strictly smaller than the corresponding character in b. For example, "abcc" is lexicographically smaller than "abcd" because the first position they differ is at the fourth character, and 'c' is smaller than 'd'.

    Example 1: =>
    Input: palindrome = "abccba"
    Output: "aaccba"
    Explanation: There are many ways to make "abccba" not a palindrome, such as "zbccba", "aaccba", and "abacba".
    Of all the ways, "aaccba" is the lexicographically smallest.
    
    Example 2: =>
    Input: palindrome = "a"
    Output: ""
    Explanation: There is no way to replace a single character to make "a" not a palindrome, so return an empty string.
    
    Constraints: =>
    1 <= palindrome.length <= 1000
    palindrome consists of only lowercase English letters.
 */

/**
 *
 * @param palindrome string
 * @returns string
 */
const breakPalindrome = (palindrome: string): string => {
	let p1: number = 0;
	let p2: number = palindrome.length - 1;
	let result: string = '';

	while (p1 < p2 && palindrome.length > 1) {
		let curr: string = '';

		if (palindrome[p1] === 'a') {
			curr = `${palindrome.slice(0, p2)}b${palindrome.slice(p2 + 1)}`;
		} else {
			curr = `${palindrome.slice(0, p1)}a${palindrome.slice(p1 + 1)}`;
		}

		if (curr < result || result === '') result = curr;
		p1 += 1;
		p2 -= 1;
	}

	return result;
};

/**
 * 
 * @param palindrome string
 * @returns string
 */
const breakPalindromeOptimized = (palindrome: string): string => {
    // if string length is 1. return empty string cos there's no possible solution
    if(palindrome.length < 2) return "";
    
    // using two pointers
    let p1: number = 0;
    let p2: number = palindrome.length - 1;
    
    while (p1 < p2) {
        // if the characters at both indexes, we ignore and move inside
        // else we replace the character at pointer 1 with "a"
        if(palindrome[p1] !== "a") {
            return `${palindrome.slice(0, p1)}a${palindrome.slice(p1 + 1)}`;
        }
        
        p1 += 1;
        p2 -= 1;
    };
    
    // if we check all the characters and we don't see any other than "a", we just make the last character "b".
    return `${palindrome.slice(0, palindrome.length - 1)}b`;
};
