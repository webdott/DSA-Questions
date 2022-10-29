/**
    * desc: Given an m x n grid of characters board and a string word, return true if word exists in the grid.

    The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

    Example 1: =>
    Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
    Output: true
    
    Example 2: =>
    Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
    Output: true
    
    Example 3: =>
    Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
    Output: false
    
    Constraints: =>
    m == board.length
    n = board[i].length
    1 <= m, n <= 6
    1 <= word.length <= 15
    board and word consists of only lowercase and uppercase English letters.

    Follow up: Could you use search pruning to make your solution faster with a larger board?
 */

/**
 *
 * @param board string[][]
 * @param word string
 * @returns boolean
 */
const exist = (board: string[][], word: string): boolean => {
	const dfs = (row: number, column: number, indexToCheck: number): boolean => {
		if (
			row < 0 ||
			row >= board.length ||
			column < 0 ||
			column >= board[0].length ||
			board[row]?.[column] !== word[indexToCheck]
		) {
			return false;
		}

		let defaultVal: string = board[row][column];

		if (
			indexToCheck === word.length - 1 &&
			board[row]?.[column] === word[indexToCheck]
		) {
			return true;
		}

		const [left, right, top, bottom] = getNeighbours(row, column);

		board[row][column] = 'x';

		const nextStepExists =
			dfs(left[0], left[1], indexToCheck + 1) ||
			dfs(right[0], right[1], indexToCheck + 1) ||
			dfs(top[0], top[1], indexToCheck + 1) ||
			dfs(bottom[0], bottom[1], indexToCheck + 1);

		board[row][column] = defaultVal;
		return nextStepExists;
	};

	const getNeighbours = (row: number, column: number): number[][] => {
		return [
			[row, column - 1],
			[row, column + 1],
			[row - 1, column],
			[row + 1, column],
		];
	};

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (board[i][j] === word[0]) {
				if (dfs(i, j, 0) === true) return true;
			}
		}
	}

	return false;
};
