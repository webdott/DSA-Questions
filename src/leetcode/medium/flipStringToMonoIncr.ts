/**
    * desc: A binary string is monotone increasing if it consists of some number of 0's (possibly none), followed by some number of 1's (also possibly none).

    You are given a binary string s. You can flip s[i] changing it from 0 to 1 or from 1 to 0.

    Return the minimum number of flips to make s monotone increasing.

    Example 1: =>
    Input: s = "00110"
    Output: 1
    Explanation: We flip the last digit to get 00111.
    
    Example 2: =>
    Input: s = "010110"
    Output: 2
    Explanation: We flip to get 011111, or alternatively 000111.
    
    Example 3: =>
    Input: s = "00011000"
    Output: 2
    Explanation: We flip to get 00000000.
    
    Constraints: =>
    1 <= s.length <= 105
    s[i] is either '0' or '1'.
 */

/**
 *
 * @param s string
 * @returns number
 */
const minFlipsMonoIncr = (s: string): number => {
	let flip: number = 0;
	let ones: number = 0;

	// idea is to if we see a zero, ansd we've not encountered a one, we continue;
	// if we see a one, we increment ones count
	// if we see a zero after we have encountered a one, we increment flip count.
	// if flip count is greater than ones count, we set flip count to ones count. and we continue the process
	for (let char of s) {
		if (char === '0') {
			if (ones === 0) continue;

			flip += 1;
			if (flip > ones) flip = ones;
		} else {
			ones += 1;
		}
	}

	return flip;
};
