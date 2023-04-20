/**
    * desc: You are given the root of a binary tree.

    A ZigZag path for a binary tree is defined as follow:

    Choose any node in the binary tree and a direction (right or left).
    If the current direction is right, move to the right child of the current node; otherwise, move to the left child.
    Change the direction from right to left or from left to right.
    Repeat the second and third steps until you can't move in the tree.
    Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).

    Return the longest ZigZag path contained in that tree.

    Example 1: =>
    Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1,null,1]
    Output: 3
    Explanation: Longest ZigZag path in blue nodes (right -> left -> right).
    
    Example 2: =>
    Input: root = [1,1,1,null,1,null,null,1,1,null,1]
    Output: 4
    Explanation: Longest ZigZag path in blue nodes (left -> right -> left -> right).
    
    Example 3: =>
    Input: root = [1]
    Output: 0
    
    Constraints: =>
    The number of nodes in the tree is in the range [1, 5 * 104].
    1 <= Node.val <= 100
 */

/**
 * Definition for a binary tree node.
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

const longestZigZag = (root: TreeNode): number => {
	let max: number = 0;

	const dfs = (currNode: TreeNode | null, type: number): number => {
		if (currNode === null) return 0;

		const left: number = dfs(currNode.left, 0);
		const right: number = dfs(currNode.right, 1);

		max = Math.max(left, right, max);

		if (type === 0) {
			return right + 1;
		} else {
			return left + 1;
		}
	};

	const left = dfs(root.left, 0);
	const right = dfs(root.right, 1);

	max = Math.max(left, right, max);

	return max;
};
