/**
    * desc: You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

    Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

    The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

    Example 1: =>
    Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
    Output: 16
    Explanation: The perimeter is the 16 yellow stripes in the image above.

    Example 2: =>
    Input: grid = [[1]]
    Output: 4

    Example 3: =>
    Input: grid = [[1,0]]
    Output: 4
    

    Constraints: =>
    row == grid.length
    col == grid[i].length
    1 <= row, col <= 100
    grid[i][j] is 0 or 1.
    There is exactly one island in grid.
 */

/**
 *
 * @param grid number[][];
 * @returns number
 */
const islandPerimeter = (grid: number[][]): number => {
	const rows: number = grid.length;
	const columns: number = grid[0].length;
	let perimeter: number = 0;

	// for each land in the grid, add all 4 sides to the perimeter and subtract 1 for each adjacent land
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			if (grid[i][j] === 1) {
				let leftLand: boolean = grid[i]?.[j - 1] === 1;
				let rightLand: boolean = grid[i]?.[j + 1] === 1;
				let topLand: boolean = grid[i - 1]?.[j] === 1;
				let bottomLand: boolean = grid[i + 1]?.[j] === 1;
				perimeter +=
					4 +
					(leftLand ? -1 : 0) +
					(rightLand ? -1 : 0) +
					(topLand ? -1 : 0) +
					(bottomLand ? -1 : 0);
			}
		}
	}

	return perimeter;
};
