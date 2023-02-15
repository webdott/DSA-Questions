/**
    * desc: Given two binary strings a and b, return their sum as a binary string.

    Example 1: =>
    Input: a = "11", b = "1"
    Output: "100"
    
    Example 2: =>
    Input: a = "1010", b = "1011"
    Output: "10101"
    
    Constraints: =>
    1 <= a.length, b.length <= 104
    a and b consist only of '0' or '1' characters.
    Each string does not contain leading zeros except for the zero itself.
 */

/**
 *
 * @param a string
 * @param b string
 * @returns string
 */
const addBinary = (a: string, b: string): string => {
	const newA: string[] = a.split('');
	const newB: string[] = b.split('');

	let result: string = '';
	let carry: number = 0;

	while (newA.length > 0 || newB.length > 0 || carry) {
		if (newA.length > 0) {
			carry += Number(newA.pop());
		}

		if (newB.length > 0) {
			carry += Number(newB.pop());
		}

		result = `${carry % 2}${result}`;

		carry = ~~(carry / 2);
	}

	return result;
};
