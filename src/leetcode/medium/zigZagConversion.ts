/**
    * desc: The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

    P   A   H   N
    A P L S I I G
    Y   I   R
    And then read line by line: "PAHNAPLSIIGYIR"

    Write the code that will take a string and make this conversion given a number of rows:

    string convert(string s, int numRows);
    
    Example 1: =>
    Input: s = "PAYPALISHIRING", numRows = 3
    Output: "PAHNAPLSIIGYIR"
    
    Example 2: =>
    Input: s = "PAYPALISHIRING", numRows = 4
    Output: "PINALSIGYAHRPI"
    Explanation:
    P     I    N
    A   L S  I G
    Y A   H R
    P     I

    Example 3: =>
    Input: s = "A", numRows = 1
    Output: "A"
    
    Constraints: =>
    1 <= s.length <= 1000
    s consists of English letters (lower-case and upper-case), ',' and '.'.
    1 <= numRows <= 1000
 */

/**
 *
 * @param s string
 * @param numRows number
 * @returns string
 */
const convert = (s: string, numRows: number): string => {
	const zigZagFormat: Map<number, string[]> = new Map();

	let i: number = 0;
	let column: number = 0;

	// make sure we don't exceed length of string
	while (i < s.length) {
		// if we get to a column where we fill all the rows, reset column back to 0
		if (column === 0 || column % (numRows - 1) === 0) {
			column = 0;
			for (let row = 0; row < numRows; row++) {
				if (i < s.length)
					zigZagFormat.set(row, [...(zigZagFormat.get(row) ?? []), s[i]]);
				i += 1;
			}
		} else {
			// else we just get the row to input and edit there
			let rowToInput: number = numRows - (column + 1);
			zigZagFormat.set(rowToInput, [
				...(zigZagFormat.get(rowToInput) ?? []),
				s[i],
			]);
			i += 1;
		}

		column += 1;
	}

	let result: string = '';

	// we get our map in this format

	/**
        {
            0: ["p", "n"],
            1: ["a", "l", "k"]
            2: ["z", "m"]
        }
    */

	// where we can now go through each row and join the values together

	for (let [key, value] of zigZagFormat.entries()) {
		result += value.join('');
	}

	return result;
};
