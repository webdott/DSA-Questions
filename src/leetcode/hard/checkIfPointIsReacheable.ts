/**
    * desc: There exists an infinitely large grid. You are currently at point (1, 1), and you need to reach the point (targetX, targetY) using a finite number of steps.

    In one step, you can move from point (x, y) to any one of the following points:

    (x, y - x)
    (x - y, y)
    (2 * x, y)
    (x, 2 * y)
    Given two integers targetX and targetY representing the X-coordinate and Y-coordinate of your final position, return true if you can reach the point from (1, 1) using some number of steps, and false otherwise.

    
    Example 1: =>
    Input: targetX = 6, targetY = 9
    Output: false
    Explanation: It is impossible to reach (6,9) from (1,1) using any sequence of moves, so false is returned.
    
    Example 2: =>
    Input: targetX = 4, targetY = 7
    Output: true
    Explanation: You can follow the path (1,1) -> (1,2) -> (1,4) -> (1,8) -> (1,7) -> (2,7) -> (4,7).
    
    Constraints: =>
    1 <= targetX, targetY <= 109
 */

/**
 *
 * @param targetX number
 * @param targetY number
 * @returns
 */
const isReachable = (targetX: number, targetY: number): boolean => {
	const gcd_func = (a: number, b: number): number => {
		if (a === 0) return b;
		if (b === 0) return a;

		let rem: number = a % b;

		return gcd_func(b, rem);
	};

	let gcd = gcd_func(targetX, targetY);

	return (gcd & (gcd - 1)) === 0;
};
