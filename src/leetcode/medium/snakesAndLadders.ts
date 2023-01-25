/**
    * desc: You are given an n x n integer matrix board where the cells are labeled from 1 to n2 in a Boustrophedon style starting from the bottom left of the board (i.e. board[n - 1][0]) and alternating direction each row.

    You start on square 1 of the board. In each move, starting from square curr, do the following:

    Choose a destination square next with a label in the range [curr + 1, min(curr + 6, n2)].
    This choice simulates the result of a standard 6-sided die roll: i.e., there are always at most 6 destinations, regardless of the size of the board.
    If next has a snake or ladder, you must move to the destination of that snake or ladder. Otherwise, you move to next.
    The game ends when you reach the square n2.
    A board square on row r and column c has a snake or ladder if board[r][c] != -1. The destination of that snake or ladder is board[r][c]. Squares 1 and n2 do not have a snake or ladder.

    Note that you only take a snake or ladder at most once per move. If the destination to a snake or ladder is the start of another snake or ladder, you do not follow the subsequent snake or ladder.

    For example, suppose the board is [[-1,4],[-1,3]], and on the first move, your destination square is 2. You follow the ladder to square 3, but do not follow the subsequent ladder to 4.
    Return the least number of moves required to reach the square n2. If it is not possible to reach the square, return -1.

    Example 1: =>
    Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
    Output: 4
    Explanation: 
    In the beginning, you start at square 1 (at row 5, column 0).
    You decide to move to square 2 and must take the ladder to square 15.
    You then decide to move to square 17 and must take the snake to square 13.
    You then decide to move to square 14 and must take the ladder to square 35.
    You then decide to move to square 36, ending the game.
    This is the lowest possible number of moves to reach the last square, so return 4.
    
    Example 2: =>
    Input: board = [[-1,-1],[-1,3]]
    Output: 1
    
    Constraints: =>
    n == board.length == board[i].length
    2 <= n <= 20
    grid[i][j] is either -1 or in the range [1, n2].
    The squares labeled 1 and n2 do not have any ladders or snakes.
 */

/**
 *
 * @param board number[][]
 * @returns number
 */
const snakesAndLadders = (board: number[][]): number => {
	const n = board.length;
	const seen: Map<number, number> = new Map();

	const getBoardPosition = (currBox: number): number => {
		// row
		let r = Math.floor((currBox - 1) / n);
		// driection of column
		let direction = r % 2; // 1 == left ; 0 == right
		//column
		let c = -1;
		if (direction == 0) {
			// right
			c = (currBox - 1) % n;
		} else {
			//left
			c = n - (((currBox - 1) % n) + 1);
		}
		// board starts from bottom
		r = n - (r + 1);
		return board[r][c];
	};

	let leastMoves: number = Infinity;

	const dfs = (currBox: number, currMoves: number, ladder?: boolean) => {
		if (currBox > n ** 2) return;

		if (currBox === n ** 2) {
			leastMoves = Math.min(leastMoves, currMoves);
			return;
		}

		const lastIndex: number = Math.min(currBox + 6, n ** 2);

		for (let i = currBox + 1; i <= lastIndex; i++) {
			const step: number = getBoardPosition(i);
			const key: number = seen.get(i) ?? Infinity;

			if (key > currMoves) {
				if (step !== -1) {
					seen.set(i, currMoves);
					dfs(getBoardPosition(i), currMoves + 1);
				} else if (i === lastIndex) {
					dfs(i, currMoves + 1);
				} else {
					seen.set(i, currMoves);
					dfs(i, currMoves + 1);
				}
			}
		}
	};

	dfs(1, 0);

	return leastMoves === Infinity ? -1 : leastMoves;
};
