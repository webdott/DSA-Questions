/**
    * desc: Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise, return false.

    A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.

    Example 1: =>
    Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
    Output: true
    Explanation:
    In the above grid, the diagonals are:
    "[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
    In each diagonal all elements are the same, so the answer is True.
    
    Example 2: =>
    Input: matrix = [[1,2],[2,2]]
    Output: false
    Explanation:
    The diagonal "[1, 2]" has different elements.
    
    Constraints: =>
    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 20
    0 <= matrix[i][j] <= 99
    
    Follow up: =>
    What if the matrix is stored on disk, and the memory is limited such that you can only load at most one row of the matrix into the memory at once?
    What if the matrix is so large that you can only load up a partial row into the memory at once?
 */

/**
 *
 * @param row number
 * @param column number
 * @returns number[]
 */
const getNextDiagonal = (row: number, column: number): number[] => {
	return [row + 1, column + 1];
};

/**
 *
 * @param matrix number[][]
 * @returns boolean
 */
const isToeplitzMatrix = (matrix: number[][]): boolean => {
	let rowLength: number = matrix.length;
	let columnLength: number = matrix[0].length;
	const seen: Map<string, boolean> = new Map();

	const isToeplitzMatrixHelper = (
		row: number,
		column: number,
		numToCheck: number
	) => {
		if (row >= rowLength || column >= columnLength) {
			return true;
		}

		let key: string = `${row}-${column}`;

		if (seen.has(key)) {
			return seen.get(key);
		}

		if (matrix[row][column] === numToCheck) {
			let [nextRow, nextColumn] = getNextDiagonal(row, column);
			let result = isToeplitzMatrixHelper(nextRow, nextColumn, numToCheck);

			seen.set(key, result);
			return result;
		} else {
			seen.set(key, false);
			return false;
		}
	};

	for (let i = 0; i < columnLength; i++) {
		if (!isToeplitzMatrixHelper(0, i, matrix[0][i])) return false;
	}

	for (let j = 0; j < rowLength; j++) {
		if (!isToeplitzMatrixHelper(j, 0, matrix[j][0])) return false;
	}

	return true;
};
