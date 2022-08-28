/**
 * desc: Given an m x n matrix matrix and an integer k, return the max sum of a rectangle in the matrix such that its sum is no larger than k.

    It is guaranteed that there will be a rectangle with a sum no larger than k.

    Example 1: =>
    Input: matrix = [[1,0,1],[0,-2,3]], k = 2
    Output: 2
    Explanation: Because the sum of the blue rectangle [[0, 1], [-2, 3]] is 2, and 2 is the max number no larger than k (k = 2).
    
    Example 2: =>
    Input: matrix = [[2,2,-1]], k = 3
    Output: 3
    
    Constraints: =>
    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 100
    -100 <= matrix[i][j] <= 100
    -105 <= k <= 105
    
    Follow up: What if the number of rows is much larger than the number of columns?
*/

/**
 *
 * @param i
 * @param j
 * @param matrix
 *
 * ======================================= Using Prefix Sum ============================================================
 */
const getSum = (i: number, j: number, matrix: number[][]): void => {
	// to get the sum of the rectangle from (0, 0) to (i, j)
	const top = matrix[i - 1]?.[j] ?? 0;
	const left = matrix[i][j - 1] ?? 0;
	const diagonal = matrix[i - 1]?.[j - 1] ?? 0;
	matrix[i][j] = matrix[i][j] + (top + left) - diagonal;
};

/**
 *
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param matrix
 * @returns number
 *
 * Function returns the sum of the submatrix from (x1, y1) to (x2, y2)
 */
const getSubMatrixSum = (
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	matrix: number[][]
): number => {
	const topSum = matrix[x1 - 1]?.[y2] ?? 0;
	const leftSum = matrix[x2][y1 - 1] ?? 0;
	const diagonalLeftSum = matrix[x1 - 1]?.[y1 - 1] ?? 0;
	const wholeSquareSum = matrix[x2][y2];

	return wholeSquareSum - (topSum + leftSum) + diagonalLeftSum;
};

/**
 *
 * @param matrix
 * @param k
 * @returns number
 *
 * Function returns the max sum of the rectangle in the matrix that is no larger than k
 */
const maxSumSubmatrix = (matrix: number[][], k: number): number => {
	const rows: number = matrix.length;
	const columns: number = matrix[0].length;

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			getSum(i, j, matrix);
		}
	}

	let max = -Infinity;
	for (let x1 = 0; x1 < rows; x1++) {
		for (let y1 = 0; y1 < columns; y1++) {
			for (let x2 = x1; x2 < rows; x2++) {
				for (let y2 = y1; y2 < columns; y2++) {
					const sumOfSubMatrix = getSubMatrixSum(x1, y1, x2, y2, matrix);
					if (sumOfSubMatrix <= k) {
						max = Math.max(max, sumOfSubMatrix);
					}
				}
			}
		}
	}

	return max;
};

/**
 *
 * @param i
 * @param j
 * @param matrix
 *
 * ======================================= Using DP (Kadane's Algorithm) ============================================================
 */

