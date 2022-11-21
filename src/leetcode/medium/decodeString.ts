/**
    * desc: Given an encoded string, return its decoded string.

    The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

    You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

    The test cases are generated so that the length of the output will never exceed 105.

    Example 1: =>
    Input: s = "3[a]2[bc]"
    Output: "aaabcbc"
    
    Example 2: =>
    Input: s = "3[a2[c]]"
    Output: "accaccacc"
    
    Example 3: =>
    Input: s = "2[abc]3[cd]ef"
    Output: "abcabccdcdcdef"

    Constraints: =>
    1 <= s.length <= 30
    s consists of lowercase English letters, digits, and square brackets '[]'.
    s is guaranteed to be a valid input.
    All the integers in s are in the range [1, 300].
 */

/**
 *
 * @param s string
 * @returns string
 */
const decodeString = (s: string): string => {
	const stack: string[] = [];

	for (let char of s) {
		if (!isNaN(Number(char))) {
			let prev: string = stack[stack.length - 1];

			if (!isNaN(Number(prev))) {
				stack.pop();
				stack.push(prev + char);
			} else {
				stack.push(char);
			}
		} else if (char === ']') {
			let char: string = '';

			while (stack[stack.length - 1] !== '[') {
				let currChar: string = stack.pop()!;

				if (!isNaN(Number(stack[stack.length - 1]))) {
					let num: string = stack.pop()!;
					char = currChar.repeat(Number(num)) + char;
				} else {
					char = currChar + char;
				}
			}

			stack.pop();
			stack.push(char);
		} else {
			stack.push(char);
		}
	}

	let result: string = '';

	for (let i = 0; i < stack.length; i++) {
		if (!isNaN(Number(stack[i]))) {
			result += stack[i + 1].repeat(Number(stack[i]));
			i += 1;
		} else {
			result += stack[i];
		}
	}

	return result;
};
