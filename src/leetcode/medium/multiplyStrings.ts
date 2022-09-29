/**
    * desc: Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

    Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

    Example 1: =>
    Input: num1 = "2", num2 = "3"
    Output: "6"
    
    Example 2: =>
    Input: num1 = "123", num2 = "456"
    Output: "56088"
    
    Constraints: =>
    1 <= num1.length, num2.length <= 200
    num1 and num2 consist of digits only.
    Both num1 and num2 do not contain any leading zero, except the number 0 itself.
 */

/**
 *
 * @param num1 string
 * @param num2 string
 * @returns string
 */
// Basic way of multiplying in college translated to code
const multiply = (num1: string, num2: string): string => {
	if (num1 === '0' || num2 === '0') return '0';

	const resultArr: number[] = Array(num1.length + num2.length).fill(0);

	num1 = num1.split('').reverse().join('');
	num2 = num2.split('').reverse().join('');

	for (let i = 0; i < num1.length; i++) {
		for (let j = 0; j < num2.length; j++) {
			let product: number = Number(num1[i]) * Number(num2[j]);
			resultArr[i + j] += product;
			resultArr[i + j + 1] += Math.floor(resultArr[i + j] / 10);
			resultArr[i + j] %= 10;
		}
	}

	while (resultArr[resultArr.length - 1] === 0) {
		resultArr.pop();
	}

	return resultArr.reverse().join('');
};
