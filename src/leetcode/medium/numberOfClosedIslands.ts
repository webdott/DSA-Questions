/**
    * desc: Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

    Return the number of closed islands.

    Example 1: =>
    Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
    Output: 2
    Explanation: 
    Islands in gray are closed because they are completely surrounded by water (group of 1s).
    
    Example 2: =>
    Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
    Output: 1
    
    Example 3: =>
    Input: grid = [[1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1],
                [1,0,1,1,1,0,1],
                [1,0,1,0,1,0,1],
                [1,0,1,1,1,0,1],
                [1,0,0,0,0,0,1],
                [1,1,1,1,1,1,1]]
    Output: 2

    Constraints: =>
    1 <= grid.length, grid[0].length <= 100
    0 <= grid[i][j] <=1
 */

/**
 *
 * @param grid number[][]
 * @returns number
 */
const closedIsland = (grid: number[][]): number => {
	const rowLength: number = grid.length;
	const columnLength: number = grid[0].length;

	// keep track of entities visited
	const visited: Map<string, boolean> = new Map();

	let noOfIslands: number = 0;

	const getNeighbours = (row: number, column: number): [number, number][] => [
		[row - 1, column],
		[row, column + 1],
		[row + 1, column],
		[row, column - 1],
	];

	const isSurroundedByWater = (row: number, column: number): boolean => {
		// return false if out of bounds
		if (row < 0 || row >= rowLength || column < 0 || column >= columnLength) {
			return false;
		}

		// return true once it is water or a land leading to current land
		if (grid[row][column] >= 1) return true;

		const key: string = `${row}-${column}`;

		// check if we have encountered land before, return whether land is surrounded by water or not
		if (visited.has(key)) return visited.get(key)!;

		const orig = grid[row][column];

		const [top, right, bottom, left] = getNeighbours(row, column);

		grid[row][column] = 2;

		// check if land is directly connected to water or connected to another land surrounded by water
		const answer =
			isSurroundedByWater(top[0], top[1]) &&
			isSurroundedByWater(right[0], right[1]) &&
			isSurroundedByWater(bottom[0], bottom[1]) &&
			isSurroundedByWater(left[0], left[1]);

		grid[row][column] = orig;
		visited.set(key, answer);

		return answer;
	};

	for (let row = 0; row < rowLength; row++) {
		for (let column = 0; column < columnLength; column++) {
			if (grid[row][column] === 0 && !visited.has(`${row}-${column}`)) {
				// check if land is surrounded by water if not checked already
				if (isSurroundedByWater(row, column)) noOfIslands += 1;
			}
		}
	}

	return noOfIslands;
};
