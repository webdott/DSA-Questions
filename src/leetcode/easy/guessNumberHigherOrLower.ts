/**
    * desc: We are playing the Guess Game. The game is as follows:

    I pick a number from 1 to n. You have to guess which number I picked.

    Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

    You call a pre-defined API int guess(int num), which returns three possible results:

    -1: Your guess is higher than the number I picked (i.e. num > pick).
    1: Your guess is lower than the number I picked (i.e. num < pick).
    0: your guess is equal to the number I picked (i.e. num == pick).
    Return the number that I picked.

    Example 1: =>
    Input: n = 10, pick = 6
    Output: 6
    
    Example 2: =>
    Input: n = 1, pick = 1
    Output: 1
    
    Example 3: =>
    Input: n = 2, pick = 1
    Output: 1

    Constraints: =>
    1 <= n <= 231 - 1
    1 <= pick <= n
 */

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */
const guessRandomNumberAPI = (n: number): ((n: number) => -1 | 0 | 1) => {
	// This is a mock of the guess API
	return (numberToGuess: number): -1 | 0 | 1 => {
		if (numberToGuess === n) {
			return 0;
		} else if (numberToGuess > n) {
			return 1;
		} else {
			return -1;
		}
	};
};

const guess = guessRandomNumberAPI(6);

/**
 * @param {number} n
 * return number
 */
const guessNumber = (n: number): number => {
	let left: number = 1;
	let right: number = n;

	while (left <= right) {
		let mid: number = left + ~~((right - left) / 2);
		let guessResult: number = guess(mid);

		if (guessResult === 0) {
			return mid;
		} else if (guessResult === 1) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return left;
};
