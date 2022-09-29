/**
    * desc: Given an integer n, return the decimal value of the binary string formed by concatenating the binary representations of 1 to n in order, modulo 109 + 7.

    Example 1: =>
    Input: n = 1
    Output: 1
    Explanation: "1" in binary corresponds to the decimal value 1. 
    
    Example 2: =>
    Input: n = 3
    Output: 27
    Explanation: In binary, 1, 2, and 3 corresponds to "1", "10", and "11".
    After concatenating them, we have "11011", which corresponds to the decimal value 27.
    
    Example 3: =>
    Input: n = 12
    Output: 505379714
    Explanation: The concatenation results in "1101110010111011110001001101010111100".
    The decimal value of that is 118505380540.
    After modulo 109 + 7, the result is 505379714.
    
    Constraints: =>
    1 <= n <= 105
 */

/**
 *
 * @param n number
 * @returns number
 */
const concatenatedBinary = (n: number): number => {
	let power: number = 2;
	let concatenatedResult: number = 1;

	// Idea is to increase the length of the string when we hit a power of 2;
	// then we add the string and find the modulus;

	// E.g 2 -> 10; 4 -> 100; 8 -> 1000

	for (let i = 2; i <= n; i++) {
		// check if we've hit a power of two, then increase length by 1;
		if ((i & (i - 1)) === 0) power *= 2;

		// shift the concantenated result string to the left by l and add the string;
		concatenatedResult = concatenatedResult * power + i;
		concatenatedResult %= 10 ** 9 + 7;
	}

	return concatenatedResult;
};
