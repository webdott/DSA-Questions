/**
 * desc: Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

    Note that after backspacing an empty text, the text will continue empty.

    Example 1: =>
    Input: s = "ab#c", t = "ad#c"
    Output: true
    Explanation: Both s and t become "ac".
    
    Example 2: =>
    Input: s = "ab##", t = "c#d#"
    Output: true
    Explanation: Both s and t become "".
    
    Example 3: =>
    Input: s = "a#c", t = "b"
    Output: false
    Explanation: s becomes "c" while t becomes "b".
    
    Constraints: =>
    1 <= s.length, t.length <= 200
    s and t only contain lowercase letters and '#' characters.

    Follow up: Can you solve it in O(n) time and O(1) space?
 */

/**
 *
 * @param s string
 * @param t string
 * @returns boolean
 */
const backspaceCompare = (s: string, t: string): boolean => {
	const stack1: string[] = [];
	const stack2: string[] = [];

	for (let i = 0; i < s.length; i++) {
		const char1 = s[i];

		if (char1 === '#') {
			stack1.pop();
		} else {
			stack1.push(char1);
		}
	}

	for (let j = 0; j < t.length; j++) {
		const char2 = t[j];

		if (char2 === '#') {
			stack2.pop();
		} else {
			stack2.push(char2);
		}
	}

	return Boolean(stack1.join('') === stack2.join(''));
};
