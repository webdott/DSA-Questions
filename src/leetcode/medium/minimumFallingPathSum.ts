/**
    * desc: Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

    A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position (row, col) will be (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).

    Example 1: =>
    Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
    Output: 13
    Explanation: There are two falling paths with a minimum sum as shown.
    
    Example 2: =>
    Input: matrix = [[-19,57],[-40,-5]]
    Output: -59
    Explanation: The falling path with a minimum sum is shown.

    Constraints: =>
    n == matrix.length == matrix[i].length
    1 <= n <= 100
    -100 <= matrix[i][j] <= 100
 */

/**
 *
 * @param matrix number[][]
 * @returns number
 */
const minFallingPathSumTopDown = (matrix: number[][]): number => {
	const rowLength: number = matrix.length;
	const memo: Map<string, number> = new Map();
	const columnLength: number = matrix[0].length;
	let minSum: number = Infinity;

	const dpIter = (currRow: number, currColumn: number): number => {
		if (
			currRow >= rowLength ||
			currRow < 0 ||
			currColumn >= columnLength ||
			currColumn < 0
		) {
			return Infinity;
		}

		let key: string = `${currRow}-${currColumn}`;
		let currSum: number = matrix[currRow][currColumn];

		if (memo.has(key)) return memo.get(key)!;

		if (currRow === rowLength - 1) {
			return currSum;
		}

		const nextMoves = getNextMoves(currRow, currColumn);

		let currMinSum: number = Infinity;

		for (let move of nextMoves) {
			currMinSum = Math.min(currMinSum, dpIter(move[0], move[1]));
		}

		memo.set(key, currSum + currMinSum);
		return currSum + currMinSum;
	};

	const getNextMoves = (row: number, column: number): number[][] => {
		return [
			[row + 1, column],
			[row + 1, column - 1],
			[row + 1, column + 1],
		];
	};

	for (let i = 0; i < columnLength; i++) {
		minSum = Math.min(minSum, dpIter(0, i));
	}

	return minSum;
};

const minFallingPathSumBottomUp = (matrix: number[][]): number => {
	for (let i = 1; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			matrix[i][j] += Math.min(
				matrix[i - 1][j - 1] ?? Infinity,
				matrix[i - 1][j] ?? Infinity,
				matrix[i - 1][j + 1] ?? Infinity
			);
		}
	}

	return Math.min(...matrix[matrix.length - 1]);
};
