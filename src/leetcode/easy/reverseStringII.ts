/**
    * desc: Given a string s and an integer k, reverse the first k characters for every 2k characters counting from the start of the string.

    If there are fewer than k characters left, reverse all of them. If there are less than 2k but greater than or equal to k characters, then reverse the first k characters and leave the other as original.

    Example 1: =>
    Input: s = "abcdefg", k = 2
    Output: "bacdfeg"
    
    Example 2: =>
    Input: s = "abcd", k = 2
    Output: "bacd"

    Constraints: =>
    1 <= s.length <= 104
    s consists of only lowercase English letters.
    1 <= k <= 104
 */

/**
 *
 * @param s string
 * @param k number
 * @returns string
 */
const reverseStr = (s: string, k: number): string => {
	let ans: string[] = s.split('');
	let i: number = 0;

	while (i < s.length) {
		let currLast: number = Math.min(i + (k - 1), i + (s.length - (i + 1)));
		for (let left = i, right = currLast; left < right; left += 1, right -= 1) {
			[ans[left], ans[right]] = [ans[right], ans[left]];
		}

		i = currLast + k + 1;
	}

	return ans.join('');
};
