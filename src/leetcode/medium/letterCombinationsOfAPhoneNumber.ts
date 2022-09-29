/**
    * desc: Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

    A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

    Example 1: =>
    Input: digits = "23"
    Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
    
    Example 2: =>
    Input: digits = ""
    Output: []
    
    Example 3: =>
    Input: digits = "2"
    Output: ["a","b","c"]
    
    Constraints: =>
    0 <= digits.length <= 4
    digits[i] is a digit in the range ['2', '9'].
 */

/**
 *
 * @param digits string
 * @returns string[]
 */
const letterCombinations = (digits: string): string[] => {
	if (digits === '') return [];

	// set the characters of each  number in the phone
	let hashTable: Record<string, string[]> = {
		'2': ['a', 'b', 'c'],
		'3': ['d', 'e', 'f'],
		'4': ['g', 'h', 'i'],
		'5': ['j', 'k', 'l'],
		'6': ['m', 'n', 'o'],
		'7': ['p', 'q', 'r', 's'],
		'8': ['t', 'u', 'v'],
		'9': ['w', 'x', 'y', 'z'],
	};

	// initialize result array
	const result: string[] = [];

	// a recursive function to get the combinations of each characters of each number in the given digits using backtracking
	const recur = (s, idx, str) => {
		if (idx === s.length) {
			result.push(str);
			return;
		}

		const numValues: string[] = hashTable[s[idx]];

		for (let value of numValues) {
			let currResult: string = `${str}${value}`;
			recur(s, idx + 1, currResult);
			currResult = currResult.slice(0, currResult.length - 1);
		}
	};

	recur(digits, 0, '');

	return result;
};
