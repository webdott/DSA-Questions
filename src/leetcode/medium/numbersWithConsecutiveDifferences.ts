/**
    * desc: Return all non-negative integers of length n such that the absolute difference between every two consecutive digits is k.

    Note that every number in the answer must not have leading zeros. For example, 01 has one leading zero and is invalid.

    You may return the answer in any order.

    Example 1: =>
    Input: n = 3, k = 7
    Output: [181,292,707,818,929]
    Explanation: Note that 070 is not a valid number, because it has leading zeroes.
    
    Example 2: =>
    Input: n = 2, k = 1
    Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]

    Constraints: =>
    2 <= n <= 9
    0 <= k <= 9
 */

/**
 *
 * @param n number
 * @param k number
 * @returns number[]
 */
const numsSameConsecDiff = (n: number, k: number): number[] => {
	const result: number[] = [];

	const getNextValue = (numSoFar: string, wordLength: number): void => {
		// if the word length is equal to the given length, push the number to the result array
		if (wordLength === n) {
			if (!result.includes(Number(numSoFar))) result.push(Number(numSoFar));
			return;
		}

		// get the last digit of the number and add or subtract the given difference to it depending on whether it is less or greater than difference
		const lastNumber = Number(numSoFar[wordLength - 1]);

		if (lastNumber >= k)
			getNextValue(`${numSoFar}${lastNumber - k}`, wordLength + 1);
		if (lastNumber + k >= 10) return;
		getNextValue(`${numSoFar}${lastNumber + k}`, wordLength + 1);
	};

	// loop through the numbers from 1 to 9 and call the helper function to get the next value
	for (let i = 1; i < 10; i++) {
		getNextValue(i.toString(), 1);
	}

	return result;
};
