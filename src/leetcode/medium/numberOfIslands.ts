/**
     * desc: Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

    An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

    Example 1: =>
    Input: grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
    ]
    Output: 1

    Example 2: =>
    Input: grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
    ]
    Output: 3
    
    Constraints: =>
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 300
    grid[i][j] is '0' or '1'.
 */

/**
 *
 * @param grid string[][];
 * @returns number
 */
const numIslands = (grid: string[][]): number => {
	const rows: number = grid.length;
	const columns: number = grid[0].length;
	let noOfIslands: number = 0;

	// recursive function to check all surroundings of particlur coordinate
	const getNeigbours = (i: number, j: number): void => {
		if (i < 0 || i >= rows || j < 0 || j >= columns || grid[i][j] === '0') {
			return;
		}

		grid[i][j] = '0';

		getNeigbours(i + 1, j);
		getNeigbours(i, j + 1);
		getNeigbours(i - 1, j);
		getNeigbours(i, j - 1);
	};

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			if (grid[i][j] === '1') {
				noOfIslands++;
				getNeigbours(i, j);
			}
		}
	}

	return noOfIslands;
};

