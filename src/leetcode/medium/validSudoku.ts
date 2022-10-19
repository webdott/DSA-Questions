/**
    * desc: Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

    Each row must contain the digits 1-9 without repetition.
    Each column must contain the digits 1-9 without repetition.
    Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
    Note:

    A Sudoku board (partially filled) could be valid but is not necessarily solvable.
    Only the filled cells need to be validated according to the mentioned rules.
    
    Example 1: =>
    Input: board = 
    [["5","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]]
    Output: true
    
    Example 2: =>
    Input: board = 
    [["8","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]]
    Output: false
    Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
    

    Constraints: =>
    board.length == 9
    board[i].length == 9
board[i][j] is a digit 1-9 or '.'.
 */

/**
 *
 * @param board string[][]
 * @returns boolean
 */
const isValidSudoku = (board: string[][]): boolean => {
	let columnSet: Set<string>[] = Array(9)
		.fill(0)
		.map((_) => new Set());
	let boxSet: Map<string, Set<string>> = new Map();

	for (let i = 0; i < 9; i++) {
		let rowSet: Set<string> = new Set();

		for (let j = 0; j < 9; j++) {
			let value: string = board[i][j];

			if (value !== '.') {
				let boxKey: string = `${~~(i / 3)}-${~~(j / 3)}`;

				if (rowSet.has(value)) return false;
				if (columnSet[j].has(value)) return false;
				if (boxSet.has(boxKey)) {
					if (boxSet.get(boxKey)!.has(value)) return false;
				}

				rowSet.add(value);
				columnSet[j].add(value);
				if (boxSet.has(boxKey)) {
					boxSet.get(boxKey)!.add(value);
				} else {
					boxSet.set(boxKey, new Set([value]));
				}
			}
		}
	}

	return true;
};
