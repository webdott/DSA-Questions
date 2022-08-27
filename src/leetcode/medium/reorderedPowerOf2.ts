/*
    You are given an integer n. We reorder the digits in any order (including the original order) such that the leading digit is not zero.

    Return true if and only if we can do this so that the resulting number is a power of two.

    Example 1: =>
    Input: n = 1
    Output: true

    Example 2: =>
    Input: n = 10
    Output: false

    Constraints: =>
    1 <= n <= 109
*/

const reorderedPowerOf2 = (n: number): boolean => {
	const sortedNumString = getSortedNums(n);

	/**
	 * Since threshold for the number is 10 ^ 9, we would loop through n = 0, 32
	 * we would get the sorted strings in each power of 2, and if there exists a number whose sorted strings is equal to that of the sortedNumString, we return 'true'
	 * otherwise, 'false'
	 */
	for (let i = 0; i <= 32; i++) {
		const powerOf2: number = 1 << i;
		const sortedPowerString = getSortedNums(powerOf2);

		if (sortedPowerString === sortedNumString) return true;
		if (sortedPowerString.length > sortedNumString.length) return false;
	}

	return false;
};

/**
 *
 * @param num
 * @returns string
 *
 * what this function does is to get each single digit in a number and sort them in ascending order.
 * Returns result in string format
 */
const getSortedNums = (num: number): string => {
	const result: number[] = [];

	while (num > 0) {
		result.push(num % 10);
		num = ~~(num / 10);
	}

	return result.sort().join('');
};

export default reorderedPowerOf2;

console.log(reorderedPowerOf2(1204));
