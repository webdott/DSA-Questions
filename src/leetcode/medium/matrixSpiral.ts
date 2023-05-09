/**
    * desc: Given an m x n matrix, return all elements of the matrix in spiral order.

    Example 1: =>
    Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
    Output: [1,2,3,6,9,8,7,4,5]
    
    Example 2: =>
    Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
    Output: [1,2,3,4,8,12,11,10,9,5,6,7]

    Constraints: =>
    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 10
    -100 <= matrix[i][j] <= 100
 */

/**
 *
 * @param matrix number[][]
 * @returns number[]
 */
const spiralOrder = (matrix: number[][]): number[] => {
	const result: number[] = [];
	let startRow: number = 0;
	let endRow: number = matrix.length - 1;
	let startCol: number = 0;
	let endCol: number = matrix[0].length - 1;

	while (result.length < matrix.length * matrix[0].length) {
		for (let i = startCol; i <= endCol; i++) {
			result.push(matrix[startRow][i]);
		}

		for (let i = startRow + 1; i <= endRow; i++) {
			result.push(matrix[i][endCol]);
		}

		for (let i = endCol - 1; i >= startCol; i--) {
			result.push(matrix[endRow][i]);
		}

		for (let i = endRow - 1; i >= startRow + 1; i--) {
			result.push(matrix[i][startCol]);
		}

		startRow += 1;
		endRow -= 1;
		startCol += 1;
		endCol -= 1;
	}

	return result;
};
