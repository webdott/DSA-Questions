/**
    * desc: Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

    The distance between two adjacent cells is 1.

    Example 1: =>
    Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
    Output: [[0,0,0],[0,1,0],[0,0,0]]
    
    Example 2: =>
    Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
    Output: [[0,0,0],[0,1,0],[1,2,1]]

    Constraints: =>
    m == mat.length
    n == mat[i].length
    1 <= m, n <= 104
    1 <= m * n <= 104
    mat[i][j] is either 0 or 1.
    There is at least one 0 in mat.
 */

/**
 *
 * @param row number
 * @param column number
 * @returns number[][]
 */
const getNeighbours = (row: number, column: number) => {
	return [
		[row - 1, column],
		[row, column + 1],
		[row + 1, column],
		[row, column - 1],
	];
};

/**
 *
 * @param mat number[][]
 * @returns number[][]
 */
const updateMatrix = (mat: number[][]): number[][] => {
	const rows: number = mat.length;
	const columns: number = mat[0].length;
	const result: number[][] = Array(rows)
		.fill(0)
		.map((_) => Array(columns).fill(0));

	const checkClosestZero = (
		row: number,
		column: number,
		valueToAdd: number
	) => {
		if (
			row >= rows ||
			row < 0 ||
			column >= columns ||
			column < 0 ||
			result[row][column] === 0 ||
			1 + valueToAdd >= result[row][column]
		)
			return;

		result[row][column] = 1 + valueToAdd;
		queue.push([row, column]);
	};

	const queue: number[][] = [];

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			if (mat[i][j] === 0) {
				queue.push([i, j]);
			} else {
				result[i][j] = rows * columns;
			}
		}
	}

	while (queue.length > 0) {
		const currCell = queue.shift()!;

		const nextNeighbours = getNeighbours(currCell[0], currCell[1]);

		for (let neighbour of nextNeighbours) {
			checkClosestZero(
				neighbour[0],
				neighbour[1],
				result[currCell[0]][currCell[1]]
			);
		}
	}

	return result;
};
