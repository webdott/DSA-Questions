/**
    * desc: Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.

    For example: =>
    A -> 1
    B -> 2
    C -> 3
    ...
    Z -> 26
    AA -> 27
    AB -> 28 
    ...
    
    Example 1: =>
    Input: columnNumber = 1
    Output: "A"
    
    Example 2: =>
    Input: columnNumber = 28
    Output: "AB"

    Example 3: =>
    Input: columnNumber = 701
    Output: "ZY"
    
    Constraints: =>
    1 <= columnNumber <= 231 - 1
 */

/**
 *
 * @param columnNumber number
 * @returns string
 */
const convertToTitle = (columnNumber: number): string => {
	let result: string = '';

	while (columnNumber > 26) {
		const remainder: number = columnNumber % 26;
		const currLetter: string = String.fromCharCode(
			remainder === 0 ? 64 + Math.abs(remainder - 26) : 64 + remainder
		);
		columnNumber =
			remainder === 0
				? Math.floor(columnNumber / 26) - 1
				: Math.floor(columnNumber / 26);
		result = currLetter + result;
	}

	result = String.fromCharCode(64 + columnNumber) + result;

	return result;
};
