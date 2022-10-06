/**
    * desc: Given the root of a binary tree and two integers val and depth, add a row of nodes with value val at the given depth depth.

    Note that the root node is at depth 1.

    The adding rule is: =>
    Given the integer depth, for each not null tree node cur at the depth depth - 1, create two tree nodes with value val as cur's left subtree root and right subtree root.
    cur's original left subtree should be the left subtree of the new left subtree root.
    cur's original right subtree should be the right subtree of the new right subtree root.
    If depth == 1 that means there is no depth depth - 1 at all, then create a tree node with value val as the new root of the whole original tree, and the original tree is the new root's left subtree.
    
    Example 1: =>
    Input: root = [4,2,6,3,1,5], val = 1, depth = 2
    Output: [4,1,1,2,null,null,6,3,1,5]
    
    Example 2: =>
    Input: root = [4,2,null,3,1], val = 1, depth = 3
    Output: [4,2,null,1,1,3,null,null,1]
    
    Constraints: =>
    The number of nodes in the tree is in the range [1, 104].
    The depth of the tree is in the range [1, 104].
    -100 <= Node.val <= 100
    -105 <= val <= 105
    1 <= depth <= the depth of tree + 1
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
 * @param val number
 * @param depth number
 * @returns TreeNode | null
 */
const addOneRow = (
	root: TreeNode | null,
	val: number,
	depth: number
): TreeNode | null => {
	// if depth is 1, we need to create a new node and make it the root and assign already existig root to the left of the new root
	if (depth === 1) {
		return new TreeNode(val, root);
	}

	// check for the level node before depth we are to add the new node.
	// add the new node to the left and right of the currNode we are at and the assign the former left and right values to the newly created nodes
	const dfs = (node: TreeNode, currDepth) => {
		if (currDepth + 1 === depth) {
			let tempLeft = node.left;
			let tempRight = node.right;

			node.left = new TreeNode(val, tempLeft);
			node.right = new TreeNode(val, null, tempRight);
			return;
		}

		if (node.left) dfs(node.left, currDepth + 1);
		if (node.right) dfs(node.right, currDepth + 1);
	};

	dfs(root!, 1);

	return root;
};
