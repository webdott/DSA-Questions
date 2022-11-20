/**
     * desc: Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

    Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

    Example 1: =>
    Input: s = "1 + 1"
    Output: 2
    
    Example 2: =>
    Input: s = " 2-1 + 2 "
    Output: 3
    
    Example 3: =>
    Input: s = "(1+(4+5+2)-3)+(6+8)"
    Output: 23

    Constraints: =>
    1 <= s.length <= 3 * 105
    s consists of digits, '+', '-', '(', ')', and ' '.
    s represents a valid expression.
    '+' is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid).
    '-' could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid).
    There will be no two consecutive operators in the input.
    Every number and running calculation will fit in a signed 32-bit integer.
 */

/**
 *
 * @param s string
 * @returns number
 */
const calculate = (s: string): number => {
	const stack: string[] = [];

	for (let i = 0; i < s.length; i++) {
		if (s[i] === ')') {
			let currNum: number = 0;

            // calculate a parenthesis block if any
			while (stack[stack.length - 1] !== '(') {
				let currChar: string = stack.pop()!;

				if (stack[stack.length - 1] === '-') {
					stack.pop();
					currNum += Number(currChar) * -1;
				} else if (currChar === '+') {
					continue;
				} else {
					currNum += Number(currChar);
				}
			}

			stack.pop();
			stack.push(currNum.toString());
		} else if (s[i] !== ' ') {
            // not bothering to push any spaces
			if (!isNaN(Number(s[i]))) {
				let lastElem: string = stack[stack.length - 1] ?? '';

                // for checking if the next char is a continuation of a digit or not
				if (
					lastElem === '+' ||
					lastElem === '-' ||
					lastElem === '(' ||
					stack.length === 0
				) {
					stack.push(s[i]);
				} else {
					stack[stack.length - 1] += s[i];
				}
			} else {
				stack.push(s[i]);
			}
		}
	}

    // final calculation
	let solution: number = 0;
	for (let i = 0; i < stack.length; i++) {
		if (stack[i] === '-') {
			solution += Number(stack[i + 1]) * -1;
			i += 1;
		} else if (stack[i] === '+') {
			continue;
		} else {
			solution += Number(stack[i]);
		}
	}

	return solution;
};
