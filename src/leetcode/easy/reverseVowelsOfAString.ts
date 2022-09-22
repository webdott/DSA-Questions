/**
    * desc: Given a string s, reverse only all the vowels in the string and return it.

    The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both cases.

    Example 1: =>
    Input: s = "hello"
    Output: "holle"
    
    Example 2: =>
    Input: s = "leetcode"
    Output: "leotcede"
    
    Constraints: =>
    1 <= s.length <= 3 * 105
    s consist of printable ASCII characters.
 */

/**
 *
 * @param s string
 * @returns string
 */
const reverseVowels = (s: string): string => {
	let left: number = 0;
	let right: number = s.length - 1;
	let ans: string[] = s.split('');
	const vowels: Set<string> = new Set([
		'A',
		'E',
		'I',
		'O',
		'U',
		'a',
		'e',
		'i',
		'o',
		'u',
	]);

	while (left < right) {
		if (vowels.has(ans[left]) && vowels.has(ans[right])) {
			[ans[left], ans[right]] = [ans[right], s[left]];
			left += 1;
			right -= 1;
		} else if (vowels.has(s[right])) {
			left += 1;
		} else if (vowels.has(s[left])) {
			right -= 1;
		} else {
			left += 1;
			right -= 1;
		}
	}

	return ans.join('');
};
