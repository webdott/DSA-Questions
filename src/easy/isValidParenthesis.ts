/*
    desc: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

    An input string is valid if:

    Open brackets must be closed by the same type of brackets.
    Open brackets must be closed in the correct order.

    Example 1: =>
    Input: s = "()"
    Output: true

    Example 2: =>
    Input: s = "()[]{}"
    Output: true

    Example 3: =>
    Input: s = "(]"
    Output: false
    

    Constraints: =>
    1 <= s.length <= 104
    s consists of parentheses only '()[]{}'.
*/

const isValid = (s: string): boolean => {
	const stack = [];

	for (let char of s) {
		if (char === ')' && stack[stack.length - 1] === '(') {
			stack.pop();
		} else if (char === ']' && stack[stack.length - 1] === '[') {
			stack.pop();
		} else if (char === '}' && stack[stack.length - 1] === '{') {
			stack.pop();
		} else {
			stack.push(char);
		}
	}

	return !Boolean(stack.length);
};
