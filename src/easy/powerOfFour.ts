/*
    desc: Given an integer n, return true if it is a power of four. Otherwise, return false.

    An integer n is a power of four, if there exists an integer x such that n == 4x.

    Example 1:
    Input: n = 16
    Output: true
    
    Example 2: =>
    Input: n = 5
    Output: false

    Example 3: => 
    Input: n = 1
    Output: true
    
    Constraints: =>
    -231 <= n <= 231 - 1
*/

const isPowerOfFour = (n: number): boolean => {
	if (n === 0) return false;
	if (n === 1) return true;

	if (n / 4 === 1) {
		return true;
	} else {
		if (n % 4 === 0) {
			return isPowerOfFour(n / 4);
		} else {
			return false;
		}
	}
};

/*=========================================OR===============================================*/

const isPowerOfFourAlt = (n: number): boolean => {
	if (n === 1) return true;
	const log = Math.log(n) / Math.log(4);
	if (log === ~~log) {
		return true;
	}

	return false;
};
