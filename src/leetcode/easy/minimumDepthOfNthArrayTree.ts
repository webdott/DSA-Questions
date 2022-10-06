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

const minDepth = (root: TreeNode | null): number => {
	if (root === null) return 0;

	let min: number = Infinity;

	const dfs = (node: TreeNode, depth: number) => {
		if (node.left === null && node.right === null) {
			min = Math.min(depth + 1, min);
			return;
		}

		if (node.left) dfs(node.left, depth + 1);
		if (node.right) dfs(node.right, depth + 1);
	};

	dfs(root, 0);

	return min;
};
