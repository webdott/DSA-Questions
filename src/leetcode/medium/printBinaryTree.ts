/**
    * desc: Given the root of a binary tree, construct a 0-indexed m x n string matrix res that represents a formatted layout of the tree. The formatted layout matrix should be constructed using the following rules:

    The height of the tree is height and the number of rows m should be equal to height + 1.
    The number of columns n should be equal to 2height+1 - 1.
    Place the root node in the middle of the top row (more formally, at location res[0][(n-1)/2]).
    For each node that has been placed in the matrix at position res[r][c], place its left child at res[r+1][c-2height-r-1] and its right child at res[r+1][c+2height-r-1].
    Continue this process until all the nodes in the tree have been placed.
    Any empty cells should contain the empty string "".
    Return the constructed matrix res.

    Example 1: =>
    Input: root = [1,2]
    Output: 
    [["","1",""],
    ["2","",""]]
    
    Example 2: =>
    Input: root = [1,2,3,null,4]
    Output: 
    [["","","","1","","",""],
    ["","2","","","","3",""],
    ["","","4","","","",""]]
    
    Constraints: =>
    The number of nodes in the tree is in the range [1, 210].
    -99 <= Node.val <= 99
    The depth of the tree will be in the range [1, 10].
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

/**
 *
 * @param root TreeNode | null
 * @returns string[][]
 */
const printTree = (root: TreeNode): string[][] => {
	let gHeight: number = 0;

	const getHeightOfTree = (node: TreeNode, height: number) => {
		gHeight = Math.max(gHeight, height + 1);

		if (node.left) getHeightOfTree(node.left, height + 1);
		if (node.right) getHeightOfTree(node.right, height + 1);
	};

	// get the height of the tree
	getHeightOfTree(root, 0);

	const n: number = 2 ** gHeight - 1;

	// set result array to be a 2d array with the height of the tree and the width of the tree
	let result: string[][] = Array(gHeight)
		.fill(0)
		.map((val) => Array(n).fill(''));

	const dfs = (node: TreeNode, row: number, col: number) => {
		result[row][col] = node.val.toString();

		if (node.left) dfs(node.left, row + 1, col - 2 ** (gHeight - row - 2));
		if (node.right) dfs(node.right, row + 1, col + 2 ** (gHeight - row - 2));
	};

	dfs(root, 0, ~~((n - 1) / 2));

	return result;
};
