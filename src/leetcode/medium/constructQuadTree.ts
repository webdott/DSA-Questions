/**
    * desc: Given a n * n matrix grid of 0's and 1's only. We want to represent grid with a Quad-Tree.

    Return the root of the Quad-Tree representing grid.

    A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:

    val: True if the node represents a grid of 1's or False if the node represents a grid of 0's. Notice that you can assign the val to True or False when isLeaf is False, and both are accepted in the answer.
    isLeaf: True if the node is a leaf node on the tree or False if the node has four children.
    class Node {
        public boolean val;
        public boolean isLeaf;
        public Node topLeft;
        public Node topRight;
        public Node bottomLeft;
        public Node bottomRight;
    }
    We can construct a Quad-Tree from a two-dimensional area using the following steps:

    If the current grid has the same value (i.e all 1's or all 0's) set isLeaf True and set val to the value of the grid and set the four children to Null and stop.
    If the current grid has different values, set isLeaf to False and set val to any value and divide the current grid into four sub-grids as shown in the photo.
    Recurse for each of the children with the proper sub-grid.

    If you want to know more about the Quad-Tree, you can refer to the wiki.

    Quad-Tree format: =>
    You don't need to read this section for solving the problem. This is only if you want to understand the output format here. The output represents the serialized format of a Quad-Tree using level order traversal, where null signifies a path terminator where no node exists below.

    It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list [isLeaf, val].

    If the value of isLeaf or val is True we represent it as 1 in the list [isLeaf, val] and if the value of isLeaf or val is False we represent it as 0.

    Example 1: =>
    Input: grid = [[0,1],[1,0]]
    Output: [[0,1],[1,0],[1,1],[1,1],[1,0]]
    Explanation: The explanation of this example is shown below:
    Notice that 0 represnts False and 1 represents True in the photo representing the Quad-Tree.

    Example 2: =>
    Input: grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]
    Output: [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
    Explanation: All values in the grid are not the same. We divide the grid into four sub-grids.
    The topLeft, bottomLeft and bottomRight each has the same value.
    The topRight have different values so we divide it into 4 sub-grids where each has the same value.
    Explanation is shown in the photo below:

    Constraints: =>
    n == grid.length == grid[i].length
    n == 2x where 0 <= x <= 6
 */

/**
 * Definition for QuadNode.
 */

class QuadNode {
	val: boolean;
	isLeaf: boolean;
	topLeft: QuadNode | null;
	topRight: QuadNode | null;
	bottomLeft: QuadNode | null;
	bottomRight: QuadNode | null;
	constructor(
		val?: boolean,
		isLeaf?: boolean,
		topLeft?: QuadNode,
		topRight?: QuadNode,
		bottomLeft?: QuadNode,
		bottomRight?: QuadNode
	) {
		this.val = val === undefined ? false : val;
		this.isLeaf = isLeaf === undefined ? false : isLeaf;
		this.topLeft = topLeft === undefined ? null : topLeft;
		this.topRight = topRight === undefined ? null : topRight;
		this.bottomLeft = bottomLeft === undefined ? null : bottomLeft;
		this.bottomRight = bottomRight === undefined ? null : bottomRight;
	}
}

/**
 *
 * @param grid number[][]
 * @returns QuadNode | null
 */
const construct = (grid: number[][]): QuadNode | null => {
	const checkAllOnesOrZeros = (
		startRow: number,
		lastRow: number,
		startCol: number,
		lastCol: number
	): boolean => {
		let numberToCheck: number = grid[startRow][startCol];

		for (let i = startRow; i < lastRow; i++) {
			for (let j = startCol; j < lastCol; j++) {
				if (grid[i][j] !== numberToCheck) return false;
			}
		}

		return true;
	};

	const createGrid = (
		startRow: number,
		lastRow: number,
		startCol: number,
		lastCol: number
	): QuadNode => {
		if (checkAllOnesOrZeros(startRow, lastRow, startCol, lastCol)) {
			const currQuadNode: QuadNode = new QuadNode(
				Boolean(grid[startRow][startCol] === 1),
				true
			);
			return currQuadNode;
		} else {
			const midRow: number = startRow + ~~((lastRow - startRow) / 2);
			const midCol: number = startCol + ~~((lastCol - startCol) / 2);

			const topLeft: QuadNode = createGrid(startRow, midRow, startCol, midCol);
			const topRight: QuadNode = createGrid(startRow, midRow, midCol, lastCol);
			const bottomLeft: QuadNode = createGrid(
				midRow,
				lastRow,
				startCol,
				midCol
			);
			const bottomRight: QuadNode = createGrid(
				midRow,
				lastRow,
				midCol,
				lastCol
			);

			const currQuadNode: QuadNode = new QuadNode(
				true,
				false,
				topLeft,
				topRight,
				bottomLeft,
				bottomRight
			);
			return currQuadNode;
		}
	};

	const root = createGrid(0, grid.length, 0, grid[0].length);
	return root;
};
