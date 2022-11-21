/**
    * desc: You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and walls (represented as '+'). You are also given the entrance of the maze, where entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are initially standing at.

    In one step, you can move one cell up, down, left, or right. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the nearest exit from the entrance. An exit is defined as an empty cell that is at the border of the maze. The entrance does not count as an exit.

    Return the number of steps in the shortest path from the entrance to the nearest exit, or -1 if no such path exists.

    Example 1: =>
    Input: maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
    Output: 1
    Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3].
    Initially, you are at the entrance cell [1,2].
    - You can reach [1,0] by moving 2 steps left.
    - You can reach [0,2] by moving 1 step up.
    It is impossible to reach [2,3] from the entrance.
    Thus, the nearest exit is [0,2], which is 1 step away.
    
    Example 2: =>
    Input: maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0]
    Output: 2
    Explanation: There is 1 exit in this maze at [1,2].
    [1,0] does not count as an exit since it is the entrance cell.
    Initially, you are at the entrance cell [1,0].
    - You can reach [1,2] by moving 2 steps right.
    Thus, the nearest exit is [1,2], which is 2 steps away.
    
    Example 3: =>
    Input: maze = [[".","+"]], entrance = [0,0]
    Output: -1
    Explanation: There are no exits in this maze.
    
    Constraints: =>
    maze.length == m
    maze[i].length == n
    1 <= m, n <= 100
    maze[i][j] is either '.' or '+'.
    entrance.length == 2
    0 <= entrancerow < m
    0 <= entrancecol < n
    entrance will always be an empty cell.
 */

/**
 *
 * @param maze string[][]
 * @param entrance number[]
 * @returns number
 */
const nearestExit = (maze: string[][], entrance: number[]): number => {
	const visited: Set<string> = new Set();
	const queue: number[][] = [];

	queue.push([...entrance, 0]);

    // using bfs
	while (queue.length > 0) {
		let queueLength: number = queue.length;

		for (let i = 0; i < queueLength; i++) {
			let coordinate: number[] = queue.shift()!;
			let key: string = `${coordinate[0]}-${coordinate[1]}`;

            // check if we've encountered coordinate, we continue
			if (visited.has(key)) continue;

            // get all neighbours of cell
			const neighbours = getNeighbours(coordinate[0], coordinate[1]);

			for (let neighbour of neighbours) {
                // check if we hit an exit and also make sure it is not the same coordinate as entrance
				if (
					neighbour[0] < 0 ||
					neighbour[0] >= maze.length ||
					neighbour[1] < 0 ||
					neighbour[1] >= maze[0].length
				) {
					if (coordinate[0] !== entrance[0] || coordinate[1] !== entrance[1]) {
						return coordinate[2];
					}
					continue;
				} else if (maze[neighbour[0]][neighbour[1]] === '.') {
                    // push next neighbour to queue if empty
					queue.push([...neighbour, coordinate[2] + 1]);
				}
			}

            // add coordinate to visited cells
			visited.add(key);
		}
	}

    // return -1 if not found.
	return -1;
};

/**
 * 
 * @param row number
 * @param column number
 * @returns number[][]
 */
const getNeighbours = (row: number, column: number): number[][] => {
	return [
		[row - 1, column],
		[row, column + 1],
		[row + 1, column],
		[row, column - 1],
	];
};
