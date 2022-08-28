/**
 * desc:
 */

/**
 *
 * @param s string
 * @param k number
 * @returns string
 *
 * Time limit exceeded with this.
 */
const removeDuplicates = (s: string, k: number): string => {
	// initialize stack with characters of string from 0 to target number required
	let stack: string[] = s.substring(0, k - 1).split('');

	for (let j = k - 1; j < s.length; j++) {
		/**
		 * start checking from character at string of target - 1
		 * If stack length + char is up to target, push all elements in range k from end of stack into a Set
		 * If all the elements in the Set are the same, it means they are up to target k. then we take the stack elements from 0 to point of stack pop. Else, push character to stack
		 */
		if (stack.length >= k - 1) {
			const char = s[j];
			let i = k - 1;
			const lastElIndexToSlice = stack.length - i;
			const set: Set<string> = new Set(stack.slice(lastElIndexToSlice));

			if (set.size === 1 && stack[lastElIndexToSlice] === char) {
				stack = stack.slice(0, lastElIndexToSlice);
			} else {
				stack.push(char);
			}
		} else {
			const sub = s.substring(j, j + (k - (stack.length + 1))).split('');
			stack = [...stack, ...sub];

			j += sub.length - 1;
		}
	}

	return stack.join('');
};

/**
 *
 * @param s string
 * @param k number
 * @returns string
 */
const fastRemoveDuplicates = (s: string, k: number): string => {
	let result: string = '';
	let stack: [string, number][] = [];

	for (let char of s) {
		/**
		 * check if the first character of the array in the last element of the stack is same with character at a given index
		 * If same and current occurences === target - 1; pop array of stack. Else increase number of occurences;
		 * If not same, Initialize an array with the char and current occurences as 1. Push array to stack.
		 */
		if (stack[stack.length - 1] && stack[stack.length - 1][0] === char) {
			if (stack[stack.length - 1][1] === k - 1) {
				stack.pop();
			} else {
				stack[stack.length - 1][1]++;
			}
		} else {
			stack.push([char, 1]);
		}
	}

	/**
	 * for each array left in stack. repeat each array character by the number of occurences and append to resulting string.
	 * Then return
	 */
	for (let str of stack) {
		result += str[0].repeat(str[1]);
	}

	return result;
};
