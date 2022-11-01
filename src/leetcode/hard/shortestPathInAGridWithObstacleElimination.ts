/**
    * desc: You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.

    Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.

    Example 1: =>
    Input: grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
    Output: 6
    Explanation: 
    The shortest path without eliminating any obstacle is 10.
    The shortest path with one obstacle elimination at position (3,2) is 6. Such path is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2).
    
    Example 2: =>
    Input: grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1
    Output: -1
    Explanation: We need to eliminate at least two obstacles to find such a walk.
    
    Constraints: =>
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 40
    1 <= k <= m * n
    grid[i][j] is either 0 or 1.
    grid[0][0] == grid[m - 1][n - 1] == 0
 */

/**
 *
 * @param grid number[][]
 * @param k number
 * @returns number
 */
const shortestPath = (grid: number[][], k: number): number => {
	const rowLength: number = grid.length;
	const columnLength: number = grid[0].length;

	const seen: Map<string, number> = new Map();

	const queue: number[][] = [];

	queue.push([0, 0, 0, k]);

	while (queue.length) {
		let [row, column, stepsSoFar, kRed] = queue.shift()!;

		const key: string = `${row}-${column}`;

		if (
			row < 0 ||
			row >= rowLength ||
			column < 0 ||
			column >= columnLength ||
			(grid[row][column] === 1 && kRed === 0)
		) {
			continue;
		}

		if (row === rowLength - 1 && column === columnLength - 1) {
			return stepsSoFar;
		}

		// check if we have seen this position before and also if we have seen it with a higher kRed value, if so, we can skip this position
		if (seen.has(key) && kRed <= seen.get(key)!) {
			continue;
		}

		if (grid[row][column] === 1) {
			kRed -= 1;
		}

		stepsSoFar += 1;

		seen.set(key, kRed);

		queue.push([row, column - 1, stepsSoFar, kRed]);
		queue.push([row, column + 1, stepsSoFar, kRed]);
		queue.push([row - 1, column, stepsSoFar, kRed]);
		queue.push([row + 1, column, stepsSoFar, kRed]);
	}

	return -1;
};
