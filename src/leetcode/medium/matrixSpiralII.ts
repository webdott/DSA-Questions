/**
    * desc: Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

    Example 1: =>
    Input: n = 3
    Output: [[1,2,3],[8,9,4],[7,6,5]]

    Example 2: =>
    Input: n = 1
    Output: [[1]]

    Constraints: =>
    1 <= n <= 20
 */

/**
 *
 * @param n number
 * @returns number[][]
 */
const generateMatrix = (n: number): number[][] => {
	const result: number[][] = Array(n)
		.fill(0)
		.map((_) => Array(n).fill(0));

	let startRow: number = 0;
	let endRow: number = result.length - 1;
	let startCol: number = 0;
	let endCol: number = result[0].length - 1;
	let currCount: number = 1;

	while (currCount < n ** 2) {
		for (let i = startCol; i <= endCol; i++) {
			result[startRow][i] = currCount;
			currCount += 1;
		}

		for (let i = startRow + 1; i <= endRow; i++) {
			result[i][endCol] = currCount;
			currCount += 1;
		}

		if (startRow !== endRow) {
			for (let i = endCol - 1; i >= startCol; i--) {
				result[endRow][i] = currCount;
				currCount += 1;
			}
		}

		if (startCol !== endCol) {
			for (let i = endRow - 1; i >= startRow + 1; i--) {
				result[i][startCol] = currCount;
				currCount += 1;
			}
		}

		startRow += 1;
		endRow -= 1;
		startCol += 1;
		endCol -= 1;
	}

	if (currCount === n ** 2) result[startRow][startCol] = currCount;

	return result;
};
